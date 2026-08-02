/**
 * 根据编码格式名称数组，计算 SDK 支持的视频编码位掩码（vc）值。
 *
 * @remarks
 * 每种编码对应一个二进制位：`h264=1`、`h265=2`、`h266=4`、`vp8=8`、`vp9=16`、`av1=32`。
 * 多个编码通过按位求和组合，未知编码按 `0` 处理。编码名称大小写不敏感。
 *
 * @param CODECS - 编码格式名称数组，如 `['h264', 'h265']`
 * @returns 组合后的 vc 数值
 * @example
 * ```ts
 * getQueryVC(['h264']);          // 1
 * getQueryVC(['h264', 'h265']);  // 3
 * getQueryVC(['H265']);          // 2（大小写不敏感）
 * ```
 */
export declare const getQueryVC: (CODECS: string[]) => number;
/**
 * 接受一个URL和一个可选的“vc”参数，并返回带有“vc”的URL` 添加或更新了参数。
 * @param {string} url url 地址
 * @param {string[]} codecs 支持的编码格式
 * @returns {string}
 *
 * @example
 * ```ts
 * addVc("https://open.y7.com/xxxxxx.m3u8?a=111", ["h264", "h265"])  // https://open.y7.com/xxxxxx.m3u8?a=111&vc=3
 * ```
 */
export declare function addVc(url: string, codecs?: string[]): string;
