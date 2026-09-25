# Learning Progress: Node.js Parallelism and Processes

> Guide: [GUIDE.md](./GUIDE.md)
> Last updated: 2026-09-25 21:52 +07

## Status

| Field | Value |
| --- | --- |
| Overall status | in progress |
| Accumulated reported active time | 0 minutes |
| Current unit | LG-03 — Communicate and move data |
| Next action | Predict how plain data, cyclic data, class instances, functions, and typed arrays behave when sent through `postMessage()`. |

## Unit checklist

Use only `not started`, `in progress`, `completed`, `blocked`, or `deferred`. Check a box only for `completed`.

- [x] LG-01 — Build the execution-model map — `completed`
- [x] LG-02 — Run CPU work in one worker — `completed`
- [ ] LG-03 — Communicate and move data — `not started`
- [ ] LG-04 — Earn parallel speedup with bounded workers — `not started`
- [ ] LG-05 — Choose and launch child processes safely — `not started`
- [ ] LG-06 — Treat child stdio and completion correctly — `not started`
- [ ] LG-07 — Cancel and clean up boundary work — `not started`
- [ ] LG-08 — Make and defend the boundary decision — `not started`

## Current checkpoint

### Last demonstrated evidence

- LG-02: Implemented and verified a TypeScript ES-module worker using `workerData`, `parentPort`, and a promise wrapper for `message`, `error`, and `exit`. For `fibonacci(40)`, measured the same result (`102334155`) with 0 main-thread timer ticks versus 9 worker-case ticks; main-thread latency was about 920 ms and worker latency about 1005 ms. Invalid input rejected through the worker `error` path, abnormal exit handling was correctly explained, and `pnpm typecheck` passed.
- LG-01: Correctly predicted and explained main-thread blocking, asynchronous filesystem work, worker-thread parallelism, and child-process isolation. Explained measured timer responsiveness and correctly stated that promises do not move synchronous JavaScript off the main thread.

### Recent misconceptions or fragile knowledge

- Initially treated promise microtasks as a way for CPU work to run after a timer; corrected to the rule that promise callbacks still run on the main JavaScript thread and drain before timers.
- Initially assigned arbitrary JavaScript and process isolation to the libuv worker pool; corrected that it runs selected native operations on threads within the same process.
- Initially treated interval timing as an exact schedule; corrected that a timer becomes eligible after its delay and can drift or be cleared before the next eligible callback runs.
- Remember that `parentPort` is `null`, not `undefined`, on the main thread, and TypeScript does not correlate it with `isMainThread` for narrowing.

### Incomplete knowledge or work

- LG-03 has not started. Clone, transfer, identity, prototype, and clone-failure behavior have not been exercised.

### Open questions

- Which values are cloned, transferable, shared, or rejected by worker messaging?

### Retrieval prompts

- Why can a worker keep the main event loop responsive while making one CPU task slightly slower?
- How do `message`, `error`, and `exit` map to exactly-once promise settlement?
- What happens to object identity and prototypes across `postMessage()`?

### Exact re-entry prompt

> Before running code, classify a plain object, cyclic object, class instance, function, and typed array as cloned, transferred, shared, or rejected when sent with `postMessage()`.

## Adaptations

- None.

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
