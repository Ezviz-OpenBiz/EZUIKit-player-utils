/**
 * 判断是否为移动端（包含 iPad 等平板设备）。
 *
 * @remarks
 * - 不直接使用 `window`，以兼容在 Worker 环境中调用。
 * - 通过 `navigator.maxTouchPoints` 识别使用桌面 UA 的 iPad。
 * - 全局变量 `__IS_MOBILE_SIMULATOR__` 用于在 PC 端模拟移动端时强制判定为移动端。
 *
 * @param agent - 可选的 User-Agent 字符串，默认取 `navigator.userAgent`
 * @returns 判定为移动端时返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isMobile(); // 依据当前环境判断
 * isMobile('Mozilla/5.0 (iPhone; ...)'); // true
 * ```
 */
export declare function isMobile(agent?: string): boolean;
/**
 * 判断是否为真正的手机移动端（不包含 iPad 等平板设备）。
 *
 * @remarks
 * 先通过 UA 排除平板（iPad、tablet、playbook、silk、非 mobile 的 android），
 * 再结合移动设备 UA 特征与触摸支持共同判定。
 *
 * @param agent - 可选的 User-Agent 字符串，默认取 `navigator.userAgent`
 * @returns 判定为手机端时返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isRealMobile('Mozilla/5.0 (iPhone; ...)'); // true
 * isRealMobile('Mozilla/5.0 (iPad; ...)');   // false
 * ```
 */
export declare const isRealMobile: (agent?: string) => boolean;
