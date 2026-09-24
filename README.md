# Node.js Practice

This repository is a personal Node.js and TypeScript practice workspace. It
contains small runnable concept demos, reusable algorithms, coding challenge
solutions, and interview exercises.

## Setup

Requirements:

- Node.js 22 or newer
- pnpm 10.9.0

Install the existing development dependencies:

```bash
pnpm install --frozen-lockfile
```

## Layout

| Path | Purpose | How to run |
| --- | --- | --- |
| `concepts/basics/` | JavaScript, TypeScript, modules, and Node.js fundamentals | `pnpm tsx concepts/basics/<topic>/main.ts` |
| `concepts/concurrency/` | Event loop, promises, timers, workers, streams, and cancellation | `pnpm tsx concepts/concurrency/<topic>/main.ts` |
| `algorithms/` | Reusable algorithm implementations with colocated tests | `pnpm tsx --test algorithms/<name>.test.ts` |
| `problems/leetcode/` | LeetCode solutions kept as runnable exercises | `pnpm tsx problems/leetcode/<problem>/main.ts` |
| `problems/hackerrank/` | HackerRank solutions kept as runnable exercises | `pnpm tsx problems/hackerrank/<problem>/main.ts` |
| `interviews/` | Company and mock interview exercises | `pnpm tsx interviews/cbtw/sort-and-merge/main.ts` |

The learning progress documents are:

- `FUNDAMENTALS_PRACTICE.md` for the broader Node.js and TypeScript roadmap.
- `INTERVIEWING_CHECKLIST.md` for interview-focused review.

## Conventions

- New exercises use TypeScript and ES modules.
- Each standalone demo or problem lives in its own directory with a `main.ts`
  entry point.
- Reusable modules keep `*.test.ts` files beside the code they test.
- Tests use `node:test` and `node:assert/strict` unless an exercise specifically
  requires another tool.
- Prefer Node.js built-ins and small examples over framework-heavy solutions.
- Add a dependency only when the current lesson needs it.

## Verification

Run the full type check:

```bash
pnpm typecheck
```

Run all tests:

```bash
pnpm test
```

Run the existing interview exercise:

```bash
pnpm tsx interviews/cbtw/sort-and-merge/main.ts
```

Some demos may intentionally throw, reject, block the event loop, leak a handle,
or exit the process. Inspect those examples before running them and use a safe
timeout when the failure mode is the lesson.
