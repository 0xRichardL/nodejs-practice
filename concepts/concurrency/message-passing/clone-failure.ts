import { MessageChannel } from "node:worker_threads";
import assert from "node:assert/strict";

const { port1, port2 } = new MessageChannel();

assert.throws(
  () => port2.postMessage(() => 1),
  { name: "DataCloneError" },
);
port1.close();
port2.close();

console.log("Function clone rejected as expected");
