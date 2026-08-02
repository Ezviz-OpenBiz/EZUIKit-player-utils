/**
 * 解析 URL 中的查询字符串（query string），返回键值对对象。
 *
 * @remarks
 * - 值会经过 {@link decodeURIComponent} 解码。
 * - 暂不支持数组形式的参数（如 `a=1&a=2`，后者会覆盖前者）。
 * - 当 URL 不含 `?` 或查询字符串为空时，返回空对象。
 *
 * @param url - 完整或带查询字符串的 URL
 * @returns 查询参数键值对对象
 * @example
 * ```ts
 * getQuery('https://open.ys7.com/help?a=1&b=2&c=3'); // { a: '1', b: '2', c: '3' }
 * getQuery('https://open.ys7.com/help'); // {}
 * ```
 */
export declare const getQuery: (url: string) => Record<string, string>;
