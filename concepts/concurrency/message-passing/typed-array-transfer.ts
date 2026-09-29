import assert from 'node:assert';
import { MessageChannel } from "node:worker_threads";

const {port1, port2} = new MessageChannel();

const array = new Uint8Array([30, 40]);

port1.on("message", (received: Uint8Array) => {
  console.log("Received typed array:", received);
  try {
    // The receiver gets a new typed-array view over the transferred bytes.
    assert.deepEqual(received, new Uint8Array([30, 40]));
    assert.strictEqual(received.byteLength, 2)
    assert.strictEqual(received.buffer.byteLength, 2)
    assert.notStrictEqual(received.buffer, array.buffer); // The sender's buffer object remains detached.
  
    console.log("All assertions passed.");
  } finally {
    port1.close();
    port2.close();
  }
});

// Transfer the backing buffer; the sender loses access before the message arrives.
port2.postMessage(array, [array.buffer]);
assert.strictEqual(array.byteLength, 0);
assert.strictEqual(array.buffer.byteLength, 0);
