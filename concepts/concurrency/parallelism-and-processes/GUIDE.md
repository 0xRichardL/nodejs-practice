# Learning Guide: Node.js Parallelism and Processes

> Created: 2026-09-25
> Guide version: 1
> Target slug: parallelism-and-processes

## Learning contract

| Field | Value |
| --- | --- |
| Desired outcome | Explain and implement parallel CPU work with `node:worker_threads` and isolated work with `node:child_process`; communicate across boundaries, handle lifecycle failures and cleanup, and justify which execution model fits a task. |
| Current level | Intermediate JavaScript and TypeScript: comfortable with promises, `async`/`await`, ES modules, and the basic Node.js event loop, but new to practical workers and child processes. |
| Success criteria | Given a workload, predict whether it blocks the main thread; build and verify a CPU-bound worker solution; demonstrate clone and transfer semantics; spawn a child with safe arguments and correctly consume its standard streams; interpret errors, exit codes, and signals; cleanly stop either kind of execution; and defend a main-thread, worker-thread, or child-process choice using isolation and measured overhead. |
| Total active-learning budget | 10 hours |
| Constraints | Use TypeScript, ES modules, Node.js built-ins, the repository's `pnpm tsx` workflow, and the installed Node.js 22 runtime. No deadline or external package is required. |

## Priority and scope

### Must learn

- Concurrency versus parallelism, and the distinct roles of the JavaScript main thread, Node's libuv worker pool, user-created worker threads, and operating-system processes.
- Worker-thread creation and lifecycle: `Worker`, `workerData`, `parentPort`, `message`, `error`, `exit`, and termination.
- Message channels, structured cloning, transferable `ArrayBuffer` ownership, and the cost of crossing an execution boundary.
- CPU-bound parallel work with a small, bounded set of reusable workers; measurement before claiming a speedup.
- Child-process selection: `spawn`, `execFile`, `exec`, and `fork`, including shell-injection risk and memory/isolation differences.
- Standard input, output, and error as streams; pipe capacity, backpressure, spawn errors, exit codes, signals, and the distinction between `exit` and `close`.
- Cancellation, timeouts, deterministic cleanup, and choosing among the main thread, workers, and child processes.

### Supporting knowledge

- `os.availableParallelism()` as a starting point—not a universal answer—for bounding CPU-parallel work.
- Typed request/result message shapes and task identifiers for correlating concurrent replies.
- Small responsiveness and throughput measurements that include worker/process startup and communication overhead.
- ES-module entry-point resolution with `new URL(..., import.meta.url)` and the fact that each worker or child has its own module execution context.

### Deliberately deferred

- `SharedArrayBuffer`, `Atomics`, locks, and lock-free algorithms: shared-memory correctness deserves a separate unit after message-passing is solid.
- `cluster` and multi-process HTTP serving: useful for a specific server-deployment goal, but not required by this section's outcomes.
- Production-grade worker-pool features such as priorities, work stealing, adaptive sizing, `AsyncResource` integration, and crash supervision: a fixed bounded pool is enough to learn the core trade-offs.
- Daemons, detached process groups, containers, privilege changes, and cross-platform signal edge cases: operational concerns outside this 10-hour backbone.
- Native addons and direct libuv worker-pool programming: Node's built-in async APIs need to be distinguished from user-created workers, not reimplemented here.

## Roadmap

| ID | Unit | Observable outcome | Key ideas | Practice and mastery evidence | Estimate |
| --- | --- | --- | --- | --- | ---: |
| LG-01 | Build the execution-model map | Correctly classify representative Node.js work as concurrent, parallel, blocking, or isolated. | Main JavaScript thread; event loop; async I/O; libuv worker pool; worker threads; processes; CPU-bound versus I/O-bound work. | Predict whether a timer stays responsive during four short workloads, run the cases, and explain every mismatch using the execution boundary involved. Complete a blank comparison table from memory after a short break. | 1 hour |
| LG-02 | Run CPU work in one worker | Move a synchronous CPU-heavy function off the main thread and account for every worker completion path. | `Worker`; `isMainThread`; `workerData`; `parentPort`; separate V8 isolates; `message`, `error`, and `exit`; startup cost. | Compare a main-thread calculation with the same calculation in one worker while a timer records responsiveness. Evidence: correct result, responsive main thread, and a promise wrapper that rejects on worker failure or abnormal exit without settling twice. | 1 hour 15 minutes |
| LG-03 | Communicate and move data | Predict and demonstrate whether a value is cloned, transferred, shared, or rejected when sent between threads. | `postMessage`; `MessageChannel` and `MessagePort`; structured-clone support and omissions; transfer lists; detached `ArrayBuffer`; message-copy cost. | Send plain data, a cyclic value, a class instance, and a typed array through a port, then transfer the typed array's backing buffer. Evidence: explain observed identity/prototype changes, the sender's detached buffer, one clone failure, and when transfer is preferable. | 1 hour 15 minutes |
| LG-04 | Earn parallel speedup with bounded workers | Use measurements to decide whether a bounded set of workers benefits a batch of CPU tasks. | Task granularity; startup and serialization overhead; fixed worker reuse; task IDs; bounded parallelism; `os.availableParallelism()`; latency versus throughput. | Measure sequential execution, one-new-worker-per-task, and a small reusable worker set on the same CPU workload. Evidence: a results table, a responsive main thread, correct results under out-of-order completion, and a short explanation of the break-even behavior—without building a generic pool framework. | 2 hours |
| LG-05 | Choose and launch child processes safely | Select and use the narrowest child-process API for a command or Node.js child. | Separate PID, memory, and V8 instance; `spawn` versus `execFile` versus `exec`; `fork` IPC; argument arrays; shell parsing and injection; environment and working directory. | Launch one external executable with explicit arguments and one Node.js child with IPC. Demonstrate why untrusted text must not be interpolated into a shell command. Evidence: explain the API choice, isolation gained, and resources spent. | 1 hour 15 minutes |
| LG-06 | Treat child stdio and completion correctly | Stream child output without deadlock or unbounded buffering and report the real completion outcome. | `stdin`, `stdout`, `stderr`; `stdio` modes; pipe capacity; stream consumption and backpressure; `error`, `exit`, and `close`; code versus signal; `maxBuffer`. | Run a child that emits multiple chunks to both output streams and can fail with a chosen code. Evidence: consume both streams, avoid `exec` buffering for large output, wait for the appropriate completion event, and distinguish spawn failure, non-zero exit, and signal termination. | 1 hour 15 minutes |
| LG-07 | Cancel and clean up boundary work | Stop a worker or child on timeout while leaving no live handles and producing one final result. | `AbortController`; child `signal`, `killSignal`, and `kill()`; worker termination; cooperative versus forced shutdown; listeners, ports, streams, and exactly-once settlement. | Add a deadline to both a worker task and a child process, exercise success, internal failure, and timeout, then confirm the parent exits naturally. Evidence: resources close on every path and failure reports preserve whether the cause was an exception, exit code, signal, or cancellation. | 1 hour |
| LG-08 | Make and defend the boundary decision | Choose the simplest correct execution model for an unfamiliar workload and support it with evidence. | Decision factors: CPU versus I/O, isolation, memory sharing, command execution, failure blast radius, startup cost, communication volume, and workload size. | Complete a capstone that routes supplied scenarios to the main thread, existing async API, worker, or child process; implement one CPU case and one isolated-command case. Evidence: passing behavior checks, a compact decision record, and a final closed-notes retrieval pass over all seven curriculum outcomes. | 1 hour |

**Planned total:** 10 hours

## Milestones

| Milestone | Units | Cumulative time | Evidence |
| --- | --- | ---: | --- |
| Parallelism foundation | LG-01–LG-04 | 5 hours 30 minutes | Explain Node's execution contexts, keep the main thread responsive, demonstrate clone versus transfer, and show when bounded workers do or do not improve a CPU workload. |
| Process control | LG-05–LG-07 | 9 hours | Launch commands safely, use IPC and stdio correctly, interpret termination, and clean up workers and children on every outcome. |
| Independent selection | LG-08 | 10 hours | Implement and defend the correct boundary for CPU parallelism and process isolation without relying on a memorized API rule alone. |

## Compact reference

### Execution model

| Place work runs | Parallel JavaScript? | Memory boundary | Best fit |
| --- | --- | --- | --- |
| Main JavaScript thread | No | Current isolate | Short orchestration and callbacks; non-blocking I/O initiation. |
| Node/libuv worker pool | Native work may run in parallel, but arbitrary application JavaScript cannot be submitted directly | Managed internally by Node/libuv | Built-in async filesystem, selected DNS, crypto, and zlib operations. |
| `worker_threads` | Yes | Same process, separate V8 isolate; clone, transfer, or deliberately share supported memory | Coarse CPU-intensive JavaScript when communication overhead is smaller than the work. |
| `child_process` | Yes | Separate OS process and memory; streams or IPC cross the boundary | External commands, stronger failure/resource isolation, or a separate Node.js process. |

- **Concurrency** means multiple tasks make progress over overlapping time; it does not prove simultaneous execution.
- **Parallelism** means work executes simultaneously on multiple processing resources.
- A promise does not move synchronous JavaScript off the current thread. `Promise.all()` can overlap I/O, but CPU loops still block the thread that runs them.

### Worker messaging

- `workerData` and `postMessage()` use structured-clone semantics: the receiver normally gets an independent value, not the sender's object identity.
- Functions and some runtime objects cannot be cloned. Custom prototypes, accessors, and property descriptors are not preserved like ordinary in-process references.
- Put transferable resources in both the message value and transfer list. Transferring an `ArrayBuffer` moves its backing memory and detaches it on the sender.
- `SharedArrayBuffer` shares memory rather than copying or transferring it; defer it until synchronization with `Atomics` is in scope.
- Reuse workers for repeated CPU tasks. Creating one worker per small task can cost more than it saves.

### Child-process APIs

| API | Shell by default | Output model | Use when |
| --- | --- | --- | --- |
| `spawn(command, args)` | No | Streams | Output may be large, input/output is incremental, or precise argument handling matters. |
| `execFile(file, args)` | No | Buffered callback/promise | Run a known executable and collect bounded output. |
| `exec(command)` | Yes | Buffered callback/promise | Shell syntax is genuinely required and every interpolated value is trusted or safely avoided. |
| `fork(modulePath)` | No | Node.js child plus IPC channel | Run another Node.js module in an isolated process and exchange messages. It is unrelated to POSIX `fork(2)`. |

- Prefer explicit argument arrays. Never interpolate untrusted input into `exec()` or `shell: true`.
- Piped stdout and stderr have finite capacity. Consume them, pipe them onward, or choose `stdio: 'ignore'`/`'inherit'` intentionally.
- A spawn `error` is different from a child that started and exited non-zero.
- `exit` reports process termination; stdio may still be open. `close` occurs after the process ends and its stdio streams close.
- On completion, record both `code` and `signal`; one is normally non-null.

### Selection and cleanup checklist

1. Is the work already handled efficiently by a non-blocking Node API? Keep it on the main orchestration path.
2. Is it sufficiently large CPU-bound JavaScript? Measure a reused worker against the baseline.
3. Does it execute an external program or need a separate failure/memory boundary? Use a child process.
4. Is data crossing the boundary large? Account for cloning, transfer, streaming, and startup overhead.
5. Bound the number of active workers/processes; `availableParallelism()` is an estimate, not a target that overrides measurement.
6. Handle success, internal error, abnormal exit, cancellation, and timeout exactly once.
7. Close ports and streams, remove no-longer-needed listeners, and await termination so the parent exits naturally.

## Sources

1. [Level 3: Parallelism and Processes](../../../FUNDAMENTALS_PRACTICE.md#parallelism-and-processes) — Established the seven repository outcomes this guide must cover.
2. [Concurrency workspace guidance](../README.md) — Established the local placement, small-demo convention, and need to flag intentional hangs or leaks.
3. [Node.js 22 worker threads](https://nodejs.org/docs/latest-v22.x/api/worker_threads.html) — Established worker suitability for CPU-intensive JavaScript, lifecycle events, cloning/transfer behavior, memory-sharing options, and the recommendation to reuse workers.
4. [Node.js 22 child processes](https://nodejs.org/docs/latest-v22.x/api/child_process.html) — Established API selection, stdio behavior, IPC, abort support, shell risk, and exit/close semantics.
5. [Node.js 22 process API](https://nodejs.org/docs/latest-v22.x/api/process.html) — Established process lifecycle, signals, IPC messages, exit behavior, and active-resource diagnostics.
6. [The Node.js event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) — Anchored the main-thread/event-loop mental model needed to distinguish concurrency from parallel execution.
7. [Don't block the event loop or worker pool](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop) — Validated the curriculum emphasis on short callbacks, CPU offloading, bounded pools, task cost, and communication overhead.
8. [The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) — Clarified supported data, clone failures, and metadata or prototype information that does not survive cloning.
9. [Node.js `os.availableParallelism()`](https://nodejs.org/docs/latest-v22.x/api/os.html#osavailableparallelism) — Established the runtime's estimate for a reasonable default degree of parallelism.

## Research limits

- The workspace runs Node.js 22.23.1; the linked `latest-v22.x` documentation can receive later Node 22 patch-level corrections, so recheck version history if an exercise behaves differently.
- Worker and process startup cost, scheduler behavior, pipe capacity, and useful parallelism are machine- and operating-system-dependent. The guide therefore requires local measurements instead of fixed performance claims.
- TypeScript worker entry-point loading can depend on the active Node.js and `tsx` behavior. Confirm the smallest compatible launch pattern when implementing LG-02; it does not change the worker/process mental model or outcomes.
