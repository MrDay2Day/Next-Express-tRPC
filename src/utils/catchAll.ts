/* eslint-disable @typescript-eslint/no-explicit-any */

type ErrorResult<T> =
  | Promise<[undefined, T] | [Error | unknown]>
  | [undefined, T]
  | [Error | unknown];

/**
 * A unified error handling utility that works with promises, async functions, sync functions, and direct values.
 * Returns a tuple where the first element is an error (if any) and the second is the result/data.
 *
 * @template T - The type of the expected result
 * @param {Promise<T> | ((...args: any[]) => T | Promise<T>) | T} target - The target to handle errors for:
 *   - Promise: Will await and handle any rejections
 *   - Function: Will execute with provided args and handle any throws
 *   - Async Function: Will execute with provided args, await, and handle any throws/rejections
 *   - Value: Will return as successful result unless accessing it throws
 * @param {any[]} [args] - Optional arguments to pass if target is a function
 * @returns {ErrorResult<T>} A promise or immediate tuple:
 *   - On success: [undefined, T] where T is the result/value
 *   - On error: [Error | unknown] containing the caught error
 *
 * @example
 * // With promises
 * const [err1, data1] = await catchAll(Promise.resolve(42));
 *
 * // With async functions
 * const [err2, data2] = await catchAll(async (x: number) => x * 2, [21]);
 *
 * // With sync functions
 * const [err3, data3] = catchAll((x: number) => x * 2, [21]);
 *
 * // With direct values
 * const [err4, data4] = catchAll(42);
 */
export function catchAll<T>(
  target: T | Promise<T> | ((...args: any[]) => T | Promise<T>),
  args: any[] = []
): ErrorResult<T> {
  try {
    // Handle promises
    if (target instanceof Promise) {
      return target
        .then((data) => [undefined, data] as [undefined, T])
        .catch((error) => [error] as [Error | unknown]);
    }

    // Handle functions (both sync and async)
    if (
      typeof target === "function" &&
      !(target instanceof Function && "prototype" in target)
    ) {
      const result = (target as (...args: any[]) => T | Promise<T>)(...args);

      // Handle async functions
      if (result instanceof Promise) {
        return result
          .then((data) => [undefined, data] as [undefined, T])
          .catch((error) => [error] as [Error | unknown]);
      }

      // Handle sync functions
      return [undefined, result] as [undefined, T];
    }

    // Handle direct values
    return [undefined, target] as [undefined, T];
  } catch (error) {
    return [error] as [Error | unknown];
  }
}
