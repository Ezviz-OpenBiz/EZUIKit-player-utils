/**
 * 从对象中挑选值
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 *
 * @example
 *
 * ```ts
 * pick({ a: '1', b: 'b' }, ['a']); // => { a: '1' }
 * ```
 */
export declare function pick(obj: Record<string | number, any>, keys: string[]): {};
