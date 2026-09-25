import { Worker, workerData, parentPort, isMainThread } from "node:worker_threads";

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
    let settled = false;
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
  await measure("main", () => fibonacci(n));
  await measure("worker", () => runInWorker(n));
}

if (!isMainThread) {
  const n = workerData as number
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new Error(`n must be a non-negative safe integer`);
  }
  const result = fibonacci(n);
  if (parentPort === null) {
    throw new Error("parentPort is not available");
  }
  parentPort.postMessage(result);
  console.log(`worker ended`);
} else {
  main()
}
