/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A helper function to handle errors in asynchronous code without the need for try-catch blocks.
 * It wraps a promise and returns a tuple where the first element is an error (if any) and the second is the resolved data.
 * @template T - The type of the promise result.
 * @param {Promise<T>} promise - The promise to handle errors for.
 * @param {any[]} promise_var - The arguments to pass to the function.
 * @returns {Promise<[undefined, T] | [Error | unknown]>} A promise that resolves to a tuple:
- On success: `[undefined, T]` where `T` is the resolved value of the passed promise.
- On error: `[Error | unknown]` where the first element is the caught error.
 * @example
 * async function doAsyncAction(var_1: string, var_2: string, var_3: string){
 *  ...
 *  return {...}
 * }
 * const [error, data] = catchError(doAsyncAction, [var_1, var_2, var_3])
 */

export async function catchErrorPromise<T>(
  promise: (...args: any[]) => Promise<T>,
  promise_var: any[]
): Promise<[undefined, T] | [Error | unknown]> {
  try {
    const data = await promise(...promise_var);
    return [undefined, data] as [undefined, T];
  } catch (error: Error | unknown) {
    return [error];
  }
}

/**
 * A utility function to handle promise rejections and return a consistent tuple result.
 *
 * @template T - The type of the resolved value of the promise.
 * @param {Promise<T>} promise - The promise to handle.
 * @returns {Promise<[undefined, T] | [Error | unknown]>} A promise that resolves to a tuple:
 * - `[undefined, T]` if the input promise resolves successfully.
 * - `[Error | unknown]` if the input promise is rejected, capturing the error.
 *
 * @example
 * const [error, result] = await catchPromise(someAsyncOperation());
 * if (error) {
 *   console.error('Operation failed:', error);
 * } else {
 *   console.log('Operation succeeded:', result);
 * }
 */
export async function catchErrorPromiseFunc<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error | unknown]> {
  try {
    const data = await promise;
    return [undefined, data] as [undefined, T];
  } catch (error: Error | unknown) {
    return [error];
  }
}

/**
 * A helper function to handle errors for a function that takes arguments.
 * It wraps a function and its arguments, and returns a tuple where the first element is an error (if any) and the second is the result.
 *
 * @template T - The type of the function result.
 *
 * @param {(x: any) => any} func - The function to handle errors for.
 * @param {any[]} func_var - The arguments to pass to the function.
 * @returns {[undefined, T] | [Error | unknown]} A tuple:
 *  - On success: `[undefined, T]` where `T` is the result of the function.
 *  - On error: `[Error | unknown]` where the first element is the caught error.
 * @example
 * function doAction(var_1: string, var_2: string, var_3: string){
 *  ...
 *  return {...}
 * }
 * const [error, data] = catchError(doAction, [var_1, var_2, var_3])
 */
export function catchError<T>(
  func: (...args: any[]) => T,
  func_var: any[]
): [undefined, T] | [Error | unknown] {
  try {
    const data = func(...func_var);
    return [undefined, data] as [undefined, T];
  } catch (error: Error | unknown) {
    return [error];
  }
}

/**
 * A utility function to safely execute a synchronous function or value and handle any thrown errors.
 *
 * @template T - The type of the function result or value.
 * @param {T} func - The synchronous function or value to execute.
 * @returns {[undefined, T] | [Error | unknown]} A tuple result:
 * - `[undefined, T]` if the execution is successful.
 * - `[Error | unknown]` if an error is thrown during execution.
 *
 * @example
 * const [error, result] = catchErrorFunc(() => someSyncFunction());
 * if (error) {
 *   console.error('Function failed:', error);
 * } else {
 *   console.log('Function succeeded:', result);
 * }
 *
 * // For simple values:
 * const [error, value] = catchErrorFunc(42); // [undefined, 42]
 */
export function catchErrorFunc<T>(func: T): [undefined, T] | [Error | unknown] {
  try {
    const data = func;
    return [undefined, data] as [undefined, T];
  } catch (error: Error | unknown) {
    return [error];
  }
}
