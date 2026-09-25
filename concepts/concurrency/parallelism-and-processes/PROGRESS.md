# Learning Progress: Node.js Parallelism and Processes

> Guide: [GUIDE.md](./GUIDE.md)
> Last updated: 2026-09-25 11:17 +07

## Status

| Field | Value |
| --- | --- |
| Overall status | in progress |
| Accumulated reported active time | 0 minutes |
| Current unit | LG-01 — Build the execution-model map |
| Next action | Predict timer responsiveness for four representative workloads before running any examples. |

## Unit checklist

Use only `not started`, `in progress`, `completed`, `blocked`, or `deferred`. Check a box only for `completed`.

- [ ] LG-01 — Build the execution-model map — `in progress`
- [ ] LG-02 — Run CPU work in one worker — `not started`
- [ ] LG-03 — Communicate and move data — `not started`
- [ ] LG-04 — Earn parallel speedup with bounded workers — `not started`
- [ ] LG-05 — Choose and launch child processes safely — `not started`
- [ ] LG-06 — Treat child stdio and completion correctly — `not started`
- [ ] LG-07 — Cancel and clean up boundary work — `not started`
- [ ] LG-08 — Make and defend the boundary decision — `not started`

## Current checkpoint

### Last demonstrated evidence

- None yet.

### Recent misconceptions or fragile knowledge

- None observed yet.

### Incomplete knowledge or work

- LG-01 prediction exercise has not started.

### Open questions

- Which execution boundary handles each workload, and will a main-thread timer remain responsive?

### Retrieval prompts

- Distinguish concurrency, parallelism, blocking, and isolation.
- Explain where application JavaScript runs in each Node.js execution model.

### Exact re-entry prompt

> For each of the four LG-01 workloads, predict where the work runs and whether a main-thread timer remains responsive.

## Adaptations

- None.

## Session log

- No closed sessions yet.
