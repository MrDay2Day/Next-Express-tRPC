import "server-only";
import { EventEmitter } from "events";

// Declare global variable to persist EventEmitter across requests
declare global {
  // eslint-disable-next-line no-var
  var eventEmitter: EventEmitter | undefined;
}

// Create or reuse the EventEmitter instance
const eventEmitter = global.eventEmitter || new EventEmitter();

// In development, attach to global to prevent recreation on hot reload
if (process.env.NODE_ENV === "development") {
  global.eventEmitter = eventEmitter;
}

export default eventEmitter;
