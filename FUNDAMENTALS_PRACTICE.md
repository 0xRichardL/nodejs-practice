# Node.js and TypeScript Fundamentals Practice

Use this checklist to track practical understanding. Mark an item complete only
when you can explain it, write a small example, and debug a nearby variation
without relying on a finished solution.

## Level 1: Foundations

### Runtime and Tooling

- [ ] Explain the relationship between JavaScript, TypeScript, V8, and Node.js
- [ ] Install and select a Node.js version
- [ ] Use `node`, `pnpm`, `tsx`, and `tsc`
- [ ] Read `package.json`, `pnpm-lock.yaml`, and `tsconfig.json`
- [ ] Run a TypeScript file and pass command-line arguments
- [ ] Use the Node.js REPL for small experiments

### Values and Language Basics

- [ ] Use `const` and `let` appropriately
- [ ] Work with strings, numbers, booleans, bigint, symbols, `null`, and `undefined`
- [ ] Explain primitive values versus object references
- [ ] Predict truthiness and falsiness
- [ ] Explain strict equality and common coercion surprises
- [ ] Use template literals and destructuring
- [ ] Use optional chaining and nullish coalescing

### Control Flow and Functions

- [ ] Write `if`, `switch`, `for`, `for...of`, and `while` statements
- [ ] Write function declarations and function expressions
- [ ] Use arrow functions and explain their `this` behavior
- [ ] Use default, rest, and spread syntax
- [ ] Explain lexical scope and closures
- [ ] Distinguish callbacks from returned values

### Arrays and Objects

- [ ] Create, read, update, and iterate arrays and objects
- [ ] Use `map`, `filter`, `reduce`, `find`, and `some`
- [ ] Explain mutating versus non-mutating array operations
- [ ] Make shallow copies and explain their limits
- [ ] Use `Map` and `Set`
- [ ] Sort values with a correct comparator

### TypeScript Basics

- [ ] Annotate function parameters and return values
- [ ] Define object types with type aliases and interfaces
- [ ] Use unions, literals, and narrowing
- [ ] Explain `any`, `unknown`, `never`, and `void`
- [ ] Handle optional and readonly properties
- [ ] Explain that TypeScript types are erased at runtime
- [ ] Read and resolve a strict-mode compiler error

### Errors and Resource Cleanup

- [ ] Throw and catch `Error` objects
- [ ] Preserve useful error context when rethrowing
- [ ] Use `finally` for cleanup
- [ ] Distinguish programmer errors from expected operational failures
- [ ] Avoid swallowing errors silently

### Modules and Packages

- [ ] Export and import named values with ES modules
- [ ] Use a default export and explain when named exports are clearer
- [ ] Explain relative imports and package imports
- [ ] Explain what `"type": "module"` changes
- [ ] Recognize basic CommonJS `require` and `module.exports` syntax

### Node.js Basics

- [ ] Read `process.argv`, environment variables, and exit codes
- [ ] Read and write a text file with `node:fs/promises`
- [ ] Work with paths using `node:path`
- [ ] Serialize and parse JSON safely
- [ ] Use standard input and output
- [ ] Create a small command-line program

### Foundation Projects

- [ ] CLI calculator
- [ ] File reader and writer
- [ ] JSON-backed task list
- [ ] Text statistics tool

## Level 2: Intermediate

### TypeScript Modeling

- [ ] Use discriminated unions for state and results
- [ ] Write generic functions and generic types
- [ ] Use `keyof`, indexed access, and mapped types
- [ ] Use utility types such as `Pick`, `Omit`, `Partial`, and `Record`
- [ ] Write and use type guards
- [ ] Explain structural typing and excess-property checks
- [ ] Avoid unsafe type assertions
- [ ] Add runtime validation at untrusted boundaries

### Promises and Async Functions

- [ ] Create and consume promises
- [ ] Use `async` and `await`
- [ ] Propagate and handle asynchronous errors
- [ ] Compare sequential and concurrent awaits
- [ ] Use `Promise.all`, `allSettled`, `race`, and `any`
- [ ] Avoid floating promises and unhandled rejections
- [ ] Add timeouts and cancellation with `AbortController`

### Event Loop and Scheduling

- [ ] Explain call-stack execution
- [ ] Predict basic task and microtask ordering
- [ ] Compare `setTimeout`, `setImmediate`, and `process.nextTick`
- [ ] Explain how CPU-heavy work blocks the event loop
- [ ] Measure event-loop delay in a small example
- [ ] Recognize starvation caused by excessive microtasks or `nextTick`

### Events, Buffers, and Streams

- [ ] Publish and consume events with `EventEmitter`
- [ ] Handle EventEmitter errors and listener cleanup
- [ ] Create and inspect `Buffer` values
- [ ] Use readable, writable, duplex, and transform streams
- [ ] Explain backpressure
- [ ] Compose streams with `pipeline`
- [ ] Compare buffered and streaming file processing

### HTTP and Networking

- [ ] Create an HTTP server with `node:http`
- [ ] Parse URLs, query strings, headers, and request bodies
- [ ] Return appropriate status codes and JSON responses
- [ ] Use `fetch` with timeouts and cancellation
- [ ] Explain connection reuse and basic keep-alive behavior
- [ ] Handle client disconnects and aborted requests

### Testing

- [ ] Write a test with `node:test`
- [ ] Use `node:assert/strict`
- [ ] Write table-driven tests
- [ ] Test synchronous and asynchronous failures
- [ ] Use setup, teardown, and subtests
- [ ] Test filesystem code with temporary directories
- [ ] Test an HTTP handler or server
- [ ] Measure test coverage

### Package Management

- [ ] Distinguish dependencies from development dependencies
- [ ] Explain semantic version ranges
- [ ] Use a frozen lockfile install
- [ ] Inspect dependency licenses and security advisories
- [ ] Publish or consume package entry points conceptually
- [ ] Explain why deep imports into packages can be fragile

### Intermediate Projects

- [ ] Streaming log analyzer
- [ ] Concurrent URL checker with a limit
- [ ] HTTP JSON API using Node.js built-ins
- [ ] File synchronization CLI with cancellation

## Level 3: Proficient

### Asynchronous Design

- [ ] Bound concurrency instead of starting unlimited work
- [ ] Propagate cancellation through multiple operations
- [ ] Design retry behavior with backoff and jitter
- [ ] Make retryable operations idempotent
- [ ] Avoid leaked timers, sockets, listeners, and promises
- [ ] Shut down cleanly while work is in flight
- [ ] Diagnose a process that does not exit

### Parallelism and Processes

- [ ] Explain concurrency versus parallelism in Node.js
- [ ] Use worker threads for CPU-bound work
- [ ] Transfer data and communicate through message ports
- [ ] Explain structured cloning and transferable objects
- [ ] Start and manage child processes
- [ ] Handle child-process standard streams and exit status
- [ ] Choose between the main thread, workers, and child processes

### Runtime and Memory

- [ ] Explain V8 heap and garbage collection at a practical level
- [ ] Distinguish stack traces from the call stack model
- [ ] Recognize common memory-leak patterns
- [ ] Capture and inspect a heap snapshot
- [ ] Capture and inspect a CPU profile
- [ ] Use `process.memoryUsage` and performance timing APIs
- [ ] Avoid optimization claims without measurement

### APIs and Data Boundaries

- [ ] Validate external input at runtime
- [ ] Design consistent error responses
- [ ] Implement pagination and filtering
- [ ] Stream large request or response bodies
- [ ] Handle multipart or binary data safely
- [ ] Apply rate limits and request-size limits
- [ ] Implement graceful HTTP shutdown

### Data Stores

- [ ] Use parameterized database queries
- [ ] Explain connection pools
- [ ] Use transactions correctly
- [ ] Handle nullable database values in TypeScript
- [ ] Separate persistence details without unnecessary layers
- [ ] Test code against a real disposable database when appropriate

### Security

- [ ] Validate and normalize untrusted input
- [ ] Prevent command, path, and SQL injection
- [ ] Avoid unsafe dynamic code execution
- [ ] Store secrets outside source control
- [ ] Handle authentication and authorization separately
- [ ] Set safe HTTP headers and cookie attributes
- [ ] Understand common dependency and supply-chain risks
- [ ] Avoid exposing sensitive values in logs and errors

### Project Organization

- [ ] Organize code by current responsibilities
- [ ] Keep side effects at clear boundaries
- [ ] Separate runtime configuration from business logic
- [ ] Design module APIs that are easy to test
- [ ] Avoid circular dependencies
- [ ] Introduce abstractions only after a concrete need appears

### Proficient Projects

- [ ] Rate-limited API client with retry and cancellation
- [ ] Streaming file-processing pipeline
- [ ] Background worker with graceful shutdown
- [ ] HTTP service with validation, persistence, and integration tests

## Level 4: Advanced

### Runtime Internals

- [ ] Explain the roles of V8 and libuv
- [ ] Describe event-loop phases and their practical consequences
- [ ] Explain the libuv thread pool and which APIs use it
- [ ] Understand async context propagation
- [ ] Use diagnostic reports for process failures
- [ ] Investigate event-loop utilization and latency
- [ ] Explain how module loading and caching work

### Advanced TypeScript

- [ ] Design useful conditional and mapped types
- [ ] Use template literal types where they improve an API
- [ ] Control generic inference and constraints
- [ ] Model nominal concepts with branded types
- [ ] Publish stable declaration files
- [ ] Test important type-level behavior
- [ ] Keep advanced types readable and diagnostically useful

### Reliability and Observability

- [ ] Implement structured logging with request correlation
- [ ] Expose meaningful health and readiness checks
- [ ] Record metrics for latency, errors, saturation, and throughput
- [ ] Propagate trace context across asynchronous boundaries
- [ ] Define timeouts and failure budgets at external boundaries
- [ ] Handle process signals and orchestrated shutdown
- [ ] Diagnose uncaught exceptions and unhandled rejections

### Performance and Scale

- [ ] Build a representative benchmark
- [ ] Separate latency, throughput, CPU, and memory concerns
- [ ] Profile before and after an optimization
- [ ] Tune stream buffering based on measurement
- [ ] Understand horizontal scaling and stateless-process constraints
- [ ] Use caching only with a concrete invalidation strategy
- [ ] Evaluate serialization and data-copy costs

### Advanced Testing

- [ ] Write integration and end-to-end tests at useful boundaries
- [ ] Use fakes, stubs, and spies deliberately
- [ ] Test cancellation, timeouts, retries, and partial failures
- [ ] Test stream errors and backpressure
- [ ] Test worker and child-process cleanup
- [ ] Add fuzz or property-based tests where inputs justify them
- [ ] Keep tests deterministic under concurrent execution

### Delivery and Operations

- [ ] Build a minimal production container image
- [ ] Run checks in continuous integration
- [ ] Configure runtime memory and shutdown behavior for containers
- [ ] Manage schema migrations safely
- [ ] Roll out and roll back a service change
- [ ] Investigate a production incident from logs, metrics, and traces

### Advanced Projects

- [ ] Production-ready service with observability and graceful shutdown
- [ ] CPU-bound worker pool with measured scaling behavior
- [ ] Streaming proxy with backpressure and cancellation
- [ ] CLI package with documented ESM entry points and type declarations

## Mastery Milestones

### Foundations to Intermediate

- [ ] Build three small tools using Node.js built-ins
- [ ] Explain reference semantics, closures, modules, and strict TypeScript
- [ ] Test both success and failure paths without a third-party framework

### Intermediate to Proficient

- [ ] Explain and demonstrate event-loop ordering
- [ ] Build a bounded asynchronous pipeline with cancellation
- [ ] Diagnose an open handle, rejected promise, and stream failure

### Proficient to Advanced

- [ ] Build and operate a complete service with graceful shutdown
- [ ] Find a real bottleneck with profiling and verify an improvement
- [ ] Explain important runtime and type-system trade-offs clearly
