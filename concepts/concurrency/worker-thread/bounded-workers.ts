import { isMainThread, parentPort, Worker, workerData } from 'node:worker_threads';

type Task = {
  id: number;
  n: number;
};

async function measure(label: string, task: () => number[] | Promise<number[]>): Promise<void> {
  console.log(`\nTest: ${label}`);

  let ticks = 0;
  const interval = setInterval(() => ticks++, 10);
  try {
    const start = performance.now();
    const results = await task();
    const elapsedMs = performance.now() - start;
    console.log("results:", results);
    console.log(`time elapsed: ${elapsedMs}ms`);
    console.log(`ticks: ${ticks}`);
  } catch (err) {
    console.error(`${label}; error: ${err}`);
  } finally {
    clearInterval(interval);
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
  }
  )
}

async function runWithWorkers(inputs: number[], workerCount: number): Promise<number[]> {
  const workers: Worker[] = [];
  const results = new Array<number>(inputs.length);
  let nextId = 0;
  let completed = 0;

  for (let i = 0; i < Math.min(inputs.length, workerCount); i++) {
    workers.push(new Worker(new URL(import.meta.url)));
  }

  try {
    return await new Promise((resolve, reject) => {
      // terminate() emits "exit" after success; that is not a task failure.
      let settled = false;

      function assignNextTask(worker: Worker) {
        if (nextId >= inputs.length) return;
        worker.postMessage({ id: nextId, n: inputs[nextId] } satisfies Task);
        nextId++;
      }

      workers.forEach((worker, workerIndex) => {
        worker.on("message", (result: Task) => {
          if (settled) return;
          // Workers may finish out of order; the id restores input order.
          results[result.id] = result.n;
          completed++;

          if (completed === inputs.length) {
            settled = true;
            resolve(results);
          } else {
            // Reuse this worker for the next unassigned input, if any.
            assignNextTask(worker);
          }
        });
        worker.once("error", (err) => {
          if (settled) return;
          settled = true;
          reject(new Error(`worker ${workerIndex}; ${err}`));
        });
        worker.once("exit", (code) => {
          if (settled) return;
          settled = true;
          if (code === 0) {
            // A clean exit without the expected result is still a failed request.
            reject(new Error(`worker ${workerIndex}; exit with no result`));
          } else {
            reject(new Error(`worker ${workerIndex}; exit: ${code}`));
          }
        });
        assignNextTask(worker);
      });
    });
  } finally {
    await Promise.all(workers.map(worker => worker.terminate()));
  }
}

if (isMainThread) {
  const inputs = [35, 36, 37, 38, 35, 36, 37, 38];
  await measure("main", () => inputs.map(fibonacci));
  await measure("fresh worker", () => Promise.all(inputs.map(runInWorker)))
  await measure("reuse workers", () => runWithWorkers(inputs, 2));
} else {
  if (parentPort === null) {
    throw new Error("parentPort is not available");
  }
  if (workerData !== undefined) {
    // fresh workers case
    const result = fibonacci(workerData as number);
    parentPort?.postMessage(result)
  } else {
    // reuse workers case
    parentPort.on("message", ({ id, n }: Task) => {
      const result = fibonacci(n);
      parentPort?.postMessage({ id, n: result } satisfies Task);
    });
  }
}
