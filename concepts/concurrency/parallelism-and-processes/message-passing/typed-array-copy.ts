import assert from 'node:assert';
import { MessageChannel } from "node:worker_threads";

const {port1, port2} = new MessageChannel();

const array = new Uint8Array([10, 20]);

port1.on("message", (received: Uint8Array) => {
  console.log("Received typed array:", received);

  try {
    assert.deepEqual(received, new Uint8Array([10, 20]));
    assert.notStrictEqual(received.buffer, array.buffer); // The received array is a copy, not the original.
  } finally {
    port1.close();
    port2.close();
  }
});

port2.postMessage(array);

array[0] = 99; // Mutating the original array after sending it does not affect the received copy.

assert.deepEqual(array, new Uint8Array([99, 20])); // The original array has changed.