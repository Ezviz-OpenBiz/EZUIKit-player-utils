/**
 * 判断给定的 URL 是否以 `http://` 或 `https://` 开头。
 *
 * @param url - 待判断的 URL 字符串
 * @returns 当 URL 以 `http://` 或 `https://` 开头时返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isHttp('https://open.ys7.com'); // true
 * isHttp('http://open.ys7.com');  // true
 * isHttp('//open.ys7.com');       // false
 * isHttp('ezopen://open.ys7.com'); // false
 * ```
 */
export declare function isHttp(url: string): boolean;
