import { Worker, workerData, parentPort, isMainThread } from "node:worker_threads";

// Interval ticks are a responsiveness signal: main-thread CPU work prevents them,
// while the same work in a separate worker lets the main event loop keep running.
async function measure(
  label: string,
  task: () => number | Promise<number>,
): Promise<void> {
  let ticks = 0
  const interval = setInterval(() => ticks++, 100)
  const start = Date.now()
  try {
    const result = await task()
    console.log(`${label}; result: ${result}; elapsed time: ${Date.now() - start}; tick count: ${ticks}`)
  } catch (err) {
    console.error(`${label}; error: ${err}`)
  }
  finally {
    clearInterval(interval)
  }
}

function fibonacci(n: number): number {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function runInWorker(n: number): Promise<number> {
  return new Promise((resolve, reject) => {
    // A request may finish through message, error, or exit. Guard all three paths
    // so the wrapper exposes exactly one final outcome.
    let settled = false;

    // This module is also the worker entry point. workerData is structured-cloned
    // into a new V8 isolate when the Worker starts.
    const worker = new Worker(new URL(import.meta.url), {
      workerData: n
    })
    worker.once("message", (result) => {
      if (settled) return;
      settled = true
      resolve(result)
    })
    worker.once("error", (err) => {
      if (settled) return;
      settled = true
      reject(err)
    })
    worker.once("exit", (code) => {
      if (settled) return;
      settled = true
      if (code === 0) {
        // A clean exit without the expected result is still a failed request.
        reject(new Error(`worker exit with no result`));
      } else {
        reject(new Error(`worker exit: ${code}`));
      }
    })
    console.log(`worker started`);
  }
  )
}

async function main() {
  const n = +process.argv[2]
  // Use the same calculation in both cases so execution placement is the variable.
  await measure("main", () => fibonacci(n));
  await measure("worker", () => runInWorker(n));
}

// The main thread and worker execute this same module; isMainThread selects the role.
if (!isMainThread) {
  const n = workerData as number
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new Error(`n must be a non-negative safe integer`);
  }
  const result = fibonacci(n);
  // parentPort is available in a Worker, but TypeScript does not infer that from
  // isMainThread, so keep the explicit runtime guard.
  if (parentPort === null) {
    throw new Error("parentPort is not available");
  }
  parentPort.postMessage(result);
  console.log(`worker ended`);
} else {
  main()
}
