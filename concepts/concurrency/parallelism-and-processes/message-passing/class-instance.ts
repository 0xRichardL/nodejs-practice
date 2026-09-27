import { MessageChannel } from "node:worker_threads";
import assert from "node:assert/strict";

// A local channel isolates the structured-clone lesson from Worker lifecycle code.
const { port1, port2 } = new MessageChannel();

// count is an own data property. increment lives on Counter.prototype.
class Counter {
  constructor(public count: number) {}

  increment(): void {
    this.count++;
  }
}

const counter = new Counter(1);

port1.on("message", (received) => {
  try {
    // Structured cloning preserves the instance's own data but does not recreate
    // its custom prototype, so prototype methods are absent on the plain clone.
    assert.notStrictEqual(received, counter);
    assert.strictEqual(received.count, 1);
    assert.strictEqual(received.increment, undefined);
    assert.strictEqual(Object.getPrototypeOf(received), Object.prototype);
    console.log("All class-instance assertions passed");
  } finally {
    // Close both linked ports so the process can exit naturally.
    port1.close();
    port2.close();
  }
})

port2.postMessage(counter);
