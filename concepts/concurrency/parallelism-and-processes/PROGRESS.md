# Learning Progress: Node.js Parallelism and Processes

> Guide: [GUIDE.md](./GUIDE.md)
> Last updated: 2026-09-27 14:35 +07

## Status

| Field | Value |
| --- | --- |
| Overall status | in progress |
| Accumulated reported active time | 0 minutes |
| Current unit | LG-04 — Earn parallel speedup with bounded workers |
| Next action | Predict responsiveness and likely overhead for sequential CPU tasks, one new worker per task, and a small reused worker set before measuring. |

## Unit checklist

Use only `not started`, `in progress`, `completed`, `blocked`, or `deferred`. Check a box only for `completed`.

- [x] LG-01 — Build the execution-model map — `completed`
- [x] LG-02 — Run CPU work in one worker — `completed`
- [x] LG-03 — Communicate and move data — `completed`
- [ ] LG-04 — Earn parallel speedup with bounded workers — `in progress`
- [ ] LG-05 — Choose and launch child processes safely — `not started`
- [ ] LG-06 — Treat child stdio and completion correctly — `not started`
- [ ] LG-07 — Cancel and clean up boundary work — `not started`
- [ ] LG-08 — Make and defend the boundary decision — `not started`

## Current checkpoint

### Last demonstrated evidence

- LG-03: Implemented and ran `message-passing/typed-array-transfer.ts`. The receiver retained `[30, 40]` in a new typed-array view with a distinct buffer object; the sender's view and buffer both reported `byteLength === 0` immediately after posting. Explained that transfer is preferable when copying a large buffer is costly and the sender no longer needs access. `pnpm typecheck` passed.
- LG-03: Implemented `message-passing/typed-array-copy.ts`; a passing run showed the receiver retained `[10, 20]` after the sender changed its array to `[99, 20]`, with distinct backing buffers and both ports closed.
- LG-03: Correctly predicted that `port2.postMessage(() => 1)` throws synchronously on the sender and sends no message. Implemented `message-passing/clone-failure.ts` with `assert.throws(..., { name: "DataCloneError" })`, explicit port cleanup, and a passing run.
- LG-03: Implemented `message-passing/class-instance.ts` with a `Counter` sent through `MessageChannel`. Assertions passed for distinct receiver identity, preserved `count`, missing `increment`, and `Object.prototype`; `pnpm typecheck` passed.
- LG-03 (in progress): Correctly predicted cloned versus transferred typed-array behavior, including sender detachment after an explicit `ArrayBuffer` transfer. Implemented a `MessageChannel` graph-cloning demo; four assertions passed for distinct receiver identity, preserved internal aliasing, and preserved cycle. Correctly predicted that a cloned class instance retains `count` but loses its `Counter` identity and method.
- LG-02: Implemented and verified a TypeScript ES-module worker using `workerData`, `parentPort`, and a promise wrapper for `message`, `error`, and `exit`. For `fibonacci(40)`, measured the same result (`102334155`) with 0 main-thread timer ticks versus 9 worker-case ticks; main-thread latency was about 920 ms and worker latency about 1005 ms. Invalid input rejected through the worker `error` path, abnormal exit handling was correctly explained, and `pnpm typecheck` passed.
- LG-01: Correctly predicted and explained main-thread blocking, asynchronous filesystem work, worker-thread parallelism, and child-process isolation. Explained measured timer responsiveness and correctly stated that promises do not move synchronous JavaScript off the main thread.

### Recent misconceptions or fragile knowledge

- LG-03: Initially expected transfer to preserve the same JavaScript `ArrayBuffer` object identity. A local check showed the sender keeps its original detached buffer object, while the receiver gets a distinct buffer object containing the transferred bytes. Also distinguished transfer from sharing a buffer through two same-thread views.
- LG-03: Initially thought a received clone could keep the source object's identity, and that two properties pointing to one source object would become two separate clones. Corrected both with `MessageChannel` reasoning and a passing graph test. Most recently predicted that the cloned `Counter` would not have `Object.prototype`; retrieve that it becomes a plain object with `Object.prototype`.
- Initially treated promise microtasks as a way for CPU work to run after a timer; corrected to the rule that promise callbacks still run on the main JavaScript thread and drain before timers.
- Initially assigned arbitrary JavaScript and process isolation to the libuv worker pool; corrected that it runs selected native operations on threads within the same process.
- Initially treated interval timing as an exact schedule; corrected that a timer becomes eligible after its delay and can drift or be cleared before the next eligible callback runs.
- Remember that `parentPort` is `null`, not `undefined`, on the main thread, and TypeScript does not correlate it with `isMainThread` for narrowing.

### Incomplete knowledge or work

- LG-03 is complete. LG-04 has not yet produced measurements; sequential, per-task worker, and reused-worker comparisons remain.

### Open questions

- For a batch of CPU tasks, when does worker startup and messaging cost outweigh parallel execution?
- How many workers should be reused for the measured machine and workload?

### Retrieval prompts

- Why does `received.buffer !== array.buffer` hold for both cloning and transfer, and which observation proves transfer?
- What does each end of a `MessageChannel` do, and does creating one create a thread?
- Which identities inside a cyclic object graph survive cloning, and which identities across the channel do not?
- Why can a worker keep the main event loop responsive while making one CPU task slightly slower?
- How do `message`, `error`, and `exit` map to exactly-once promise settlement?
- What happens to object identity and prototypes across `postMessage()`?

### Exact re-entry prompt

> Before coding LG-04, predict which of three CPU batch strategies—sequential main-thread execution, one new worker per task, or a small reused worker set—keeps the main thread responsive and which might be fastest for tiny versus coarse tasks. Explain the costs behind each prediction.

## Adaptations

- LG-03: Added a focused `MessageChannel` mini-lesson before the hands-on clone/transfer exercise because the API had not yet been introduced.
- LG-03: Kept the learner's graph-cloning demo as a standalone reminder by renaming `message-passing/main.ts` to `message-passing/graph-cloning.ts`; started a separate `message-passing/class-instance.ts` file for the class exercise at the learner's request.
- LG-03 took longer than the initial estimate because the learner worked through transfer ownership and reconstructed object identity in detail. LG-04 starts with the remaining time in the current session; its measurements may continue in the next session.

## Session log

### Session 1 — 2026-09-25

- Planned time: 3 hours
- Actual active time: not reported
- Units worked: LG-01
- Learner evidence: Predicted four execution models, compared predictions with timestamped runs, explained timer responsiveness, and completed a corrected execution-boundary teach-back.
- Misconceptions or uncertainty: Promise microtasks and libuv ownership were initially conflated with parallel JavaScript; both were corrected. Exact timer-versus-I/O ordering should be retrieved again later.
- Unresolved work: LG-02 has not started.
- Research notes: Used the guide's Node.js 22 execution model. Local measurements were made on Node.js 22.23.1; an inline worker initially exposed an ES-module/CommonJS loader mismatch, then ran successfully with ES-module syntax.
- Next prompt: Before writing code, list the `Worker` events and outcomes a promise wrapper must handle to resolve or reject exactly once.

### Session 2 — 2026-09-25

- Planned time: 1 hour 30 minutes
- Actual active time: not reported
- Units worked: LG-02
- Learner evidence: Implemented a one-worker Fibonacci calculation, exactly-once lifecycle wrapper, invalid-input error path, and timer-based responsiveness measurement; explained startup overhead, timer drift, and abnormal exit handling.
- Misconceptions or uncertainty: `parentPort` nullability and interval precision required correction. The learner now distinguishes `error` from a nonzero `exit` and responsiveness from single-task speedup.
- Unresolved work: LG-03 has not started.
- Research notes: Verified lifecycle semantics against the Node.js 22 worker documentation and tested locally on Node.js 22.23.1 with tsx 4.21.0. Success, validation failure, responsiveness, and repository-wide type checking passed.
- Next prompt: Before running code, classify a plain object, cyclic object, class instance, function, and typed array as cloned, transferred, shared, or rejected when sent with `postMessage()`.

### Session 3 — 2026-09-26

- Planned time: 2 hours
- Actual active time: not reported
- Units worked: LG-03 (in progress)
- Learner evidence: Predicted copy versus transfer behavior for typed arrays and sender detachment; implemented and verified a `MessageChannel` graph-cloning example with four passing assertions.
- Misconceptions or uncertainty: Initially expected cross-channel object identity and separate clones for repeated references; corrected. The latest class-instance prediction missed that the received plain object's prototype is `Object.prototype`.
- Unresolved work: Demonstrate class-instance prototype loss, function clone failure, typed-array copy, explicit transfer, and the choice between copy and transfer. LG-03 mastery evidence is not yet complete.
- Research notes: Checked the official Node.js 22 worker-thread messaging documentation. The first `pnpm tsx` run was blocked by the sandbox's local IPC socket restriction; the approved run passed. Session wall time was about 1 hour 54 minutes at closing; actual active-learning time was not reported.
- Next prompt: A `Counter` instance crosses a `MessageChannel` and arrives with its `count` data. Why is `Object.getPrototypeOf(received) === Object.prototype` true, and what happens to `increment()`? Then extend the demo to test it and a function clone failure.

### Session 4 — 2026-09-26

- Planned time: 1 hour
- Actual active time: not reported
- Units worked: LG-03 (in progress)
- Learner evidence: Correctly explained why a cloned `Counter` has `Object.prototype`; implemented and passed separate class-instance, function `DataCloneError`, and typed-array copy demos. Preserved the prior graph demo as `graph-cloning.ts` and verified it still runs.
- Misconceptions or uncertainty: Expected an assertion checking a thrown error to make the script exit with an error; clarified that `assert.throws()` catches the expected exception and passes silently.
- Unresolved work: Demonstrate explicit `ArrayBuffer` transfer and sender detachment, then explain when transfer is preferable. LG-03 mastery evidence is not yet complete.
- Research notes: Used the guide's official Node.js 22 messaging references and verified behavior on the installed Node.js 22 runtime. `pnpm tsx` required the previously approved sandbox escalation to create its local IPC socket. Session wall time was about 55 minutes at closing; actual active-learning time was not reported.
- Next prompt: Create `message-passing/typed-array-transfer.ts`, send `[30, 40]` with its buffer in the transfer list, prove both sender `byteLength` values become zero, and explain when transfer is preferable to copying.
