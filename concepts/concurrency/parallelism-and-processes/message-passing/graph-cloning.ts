import { MessageChannel } from "node:worker_threads";
import assert from "node:assert/strict";

// MessageChannel creates two linked ports. It demonstrates messaging semantics
// here without creating another thread: a send on one port arrives on the other.
const { port1, port2 } = new MessageChannel();

const shared = { count: 1 };
// left and right test repeated references; self adds a cycle to the same graph.
const original = {
  left: shared,
  right: shared,
  self: undefined as unknown,
};
original.self = original;

port1.on("message", (received) => {
  try {
    // Structured cloning creates new identities across the channel while
    // preserving aliases and cycles inside the cloned object graph.
    assert.notStrictEqual(received, original);
    assert.notStrictEqual(received.left, shared);
    assert.strictEqual(received.left, received.right);
    assert.strictEqual(received.self, received);
    console.log("All graph-cloning assertions passed");
  } finally {
    // MessagePorts are live resources; close both ends when the demo is done.
    port1.close();
    port2.close();
  }
})

// postMessage snapshots the graph using structured-clone semantics.
port2.postMessage(original);
