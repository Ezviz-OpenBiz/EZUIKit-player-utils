/**
 * 判断值是否为空，即 `undefined`、空字符串 `''` 或 `null`。
 *
 * @remarks
 * 仅判断上述三种情况，不会将 `0`、`false`、`NaN` 视为空。
 *
 * @param param - 待判断的值
 * @returns 当值为 `undefined`、`''` 或 `null` 时返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isEmpty(undefined); // true
 * isEmpty('');        // true
 * isEmpty(null);      // true
 * isEmpty(0);         // false
 * isEmpty('a');       // false
 * ```
 */
export declare function isEmpty(param: unknown): boolean;
/**
 * 判断对象是否为空对象（不含任何自有可枚举属性）。
 *
 * @remarks
 * 内部通过 `JSON.stringify(obj) === '{}'` 判断，因此不可序列化的入参会被捕获异常并返回 `false`。
 *
 * @param obj - 待判断的对象
 * @returns 当对象为 `{}` 时返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * objectIsNull({});          // true
 * objectIsNull({ a: 1 });    // false
 * ```
 */
export declare function objectIsNull(obj: object): boolean;
