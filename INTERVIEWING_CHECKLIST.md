# Node.js and TypeScript Interview Skills Checklist

Topics are grouped by how commonly they appear in backend Node.js interviews.
Use the tiers to prioritize practice, not as guarantees for a specific company.

## Tier 1: Almost Guaranteed

### JavaScript Semantics

- [ ] Primitive values versus object references
- [ ] `const`, `let`, scope, hoisting, and the temporal dead zone
- [ ] Closures and common capture mistakes
- [ ] `this` in methods, functions, and arrow functions
- [ ] Truthiness, strict equality, `null`, and `undefined`
- [ ] Object and array mutation versus copying
- [ ] Destructuring, spread, and shallow-copy behavior

### Async JavaScript and the Event Loop

- [ ] Promise states and chaining
- [ ] `async` and `await` error propagation
- [ ] Sequential versus concurrent awaits
- [ ] `Promise.all` and partial-failure alternatives
- [ ] Task and microtask ordering
- [ ] `process.nextTick`, timers, and `setImmediate`
- [ ] Event-loop blocking and CPU-bound work
- [ ] Unhandled promise rejections

### TypeScript

- [ ] Type inference and explicit annotations
- [ ] Interfaces versus type aliases
- [ ] Unions, intersections, and narrowing
- [ ] `any`, `unknown`, `never`, and `void`
- [ ] Generics and constraints
- [ ] Structural typing
- [ ] Compile-time types versus runtime validation
- [ ] Safe handling of nullable and optional values

### Node.js Fundamentals

- [ ] Node.js, V8, and libuv responsibilities
- [ ] ES modules versus CommonJS
- [ ] Module resolution and caching
- [ ] Environment variables and process lifecycle
- [ ] Error-first callbacks and modern promise APIs
- [ ] Common sources of open handles
- [ ] Graceful shutdown basics

### API and Error Handling

- [ ] HTTP request and response lifecycle
- [ ] Status codes and consistent error responses
- [ ] Input validation at system boundaries
- [ ] Timeouts and cancellation
- [ ] Operational errors versus programmer errors
- [ ] Preserving error context without leaking sensitive data

### Testing

- [ ] Unit versus integration versus end-to-end tests
- [ ] Testing asynchronous success and failure
- [ ] Test doubles and dependency boundaries
- [ ] Deterministic tests and cleanup
- [ ] Important API and algorithm edge cases

## Tier 2: High Chance

### Streams and Buffers

- [ ] Buffer encoding and binary data
- [ ] Readable, writable, duplex, and transform streams
- [ ] Backpressure
- [ ] `pipeline` and stream error handling
- [ ] Streaming versus buffering trade-offs

### Concurrency and Parallelism

- [ ] Concurrency limits
- [ ] `AbortController` propagation
- [ ] Worker threads for CPU-bound tasks
- [ ] Child processes and standard streams
- [ ] Message passing and data-copy costs
- [ ] Race conditions around shared external resources

### Performance and Memory

- [ ] Common memory-leak patterns
- [ ] CPU and heap profiling
- [ ] Event-loop latency
- [ ] Garbage collection at a practical level
- [ ] Benchmark design and measurement pitfalls
- [ ] Caching trade-offs and invalidation

### Databases and Reliability

- [ ] Connection pooling
- [ ] Transactions and isolation basics
- [ ] Parameterized queries
- [ ] Retry safety and idempotency
- [ ] Backoff, jitter, and retry limits
- [ ] Partial failures and graceful degradation

### Security

- [ ] Authentication versus authorization
- [ ] Command, path, and SQL injection
- [ ] Secret and credential handling
- [ ] Dependency and supply-chain risk
- [ ] Rate limiting and request-size limits
- [ ] Safe logging and error responses

## Tier 3: Medium Chance

### Advanced TypeScript

- [ ] Conditional and mapped types
- [ ] Utility types and indexed access
- [ ] Variance and assignability
- [ ] Branded types
- [ ] Declaration files and package exports
- [ ] Type-level complexity trade-offs

### Runtime Internals

- [ ] Event-loop phases in detail
- [ ] libuv thread-pool behavior
- [ ] Async context propagation
- [ ] V8 optimization and deoptimization at a high level
- [ ] Heap snapshots and diagnostic reports
- [ ] Native addons conceptually

### Distributed Systems

- [ ] Stateless processes and horizontal scaling
- [ ] Queues and delivery semantics
- [ ] Distributed tracing context
- [ ] Cache consistency
- [ ] Circuit breakers and load shedding
- [ ] Ordering, duplication, and eventual consistency

## Tier 4: Nice to Have

- [ ] Node.js core contribution workflow
- [ ] Custom loaders and module hooks
- [ ] Native addons with N-API
- [ ] Advanced V8 internals
- [ ] High-performance networking protocols
- [ ] Custom observability instrumentation

## Practical Interview Readiness

- [ ] Clarify requirements before coding
- [ ] State assumptions and important edge cases
- [ ] Start with a correct simple solution
- [ ] Explain time and space complexity
- [ ] Write or describe useful tests
- [ ] Debug from evidence instead of guessing
- [ ] Explain trade-offs without over-engineering
- [ ] Use TypeScript to clarify the solution rather than hide it
- [ ] Recognize when a Node.js runtime concern changes the design
