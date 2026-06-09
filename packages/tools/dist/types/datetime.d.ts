/**
 * 可被解析为日期的输入类型。
 *
 * 可以是以下三种之一：
 * - `Date`：原生 Date 对象
 * - `number`：时间戳，支持毫秒（13 位）或秒（10 位）
 * - `string`：日期字符串，支持 ISO 格式及多种常见格式
 *
 * @example
 * ```ts
 * const a: DateLike = new Date();
 * const b: DateLike = 1709452800000;
 * const c: DateLike = '2023-10-01';
 * ```
 */
export type DateLike = Date | number | string;
/**
 * 日期时间单位。
 *
 * 为了便于使用，同一单位提供了多种等价写法：
 * - 年：`year` | `y` | `年`
 * - 月：`month` | `M` | `月`
 * - 日：`day` | `d` | `日`
 * - 时：`hour` | `h` | `时`
 * - 分：`minute` | `m` | `分`
 * - 秒：`second` | `s` | `秒`
 *
 * @example
 * ```ts
 * DateTime.add('2023-10-01', 1, 'day');
 * DateTime.add('2023-10-01', 1, 'd');
 * DateTime.add('2023-10-01', 1, '日');
 * ```
 */
export type DateUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'y' | 'M' | 'd' | 'h' | 'm' | 's' | '年' | '月' | '日' | '时' | '分' | '秒';
/**
 * 日期时间工具类。
 *
 * 提供日期的解析、格式化、加减运算以及时间差计算等常用能力。所有方法均为静态方法，
 * 无需实例化即可直接调用。输入统一使用 {@link DateLike} 类型，单位统一使用
 * {@link DateUnit} 类型，并支持中文与英文缩写等多种写法。
 *
 * @example
 * ```ts
 * import DateTime from './datetime';
 *
 * // 解析
 * DateTime.toDate('2023-10-01');
 *
 * // 格式化
 * DateTime.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
 *
 * // 加减运算
 * DateTime.add('2023-10-01', 1, 'month');
 * DateTime.subtract('2023-10-01', 2, 'day');
 *
 * // 时间差
 * DateTime.diff('2023-10-02', '2023-10-01', 'day'); // 1
 * ```
 */
declare class DateTime {
    /**
     * 将 {@link DateUnit} 的各种写法归一化为标准的英文单位。
     *
     * 例如 `y`、`年` 都会被归一化为 `year`。当传入未匹配到的值时，
     * 兜底返回 `second`。
     *
     * @param unit - 待归一化的日期时间单位
     * @returns 归一化后的标准单位（`year` | `month` | `day` | `hour` | `minute` | `second`）
     * @example
     * ```ts
     * DateTime['normalizeUnit']('年'); // 'year'
     * DateTime['normalizeUnit']('d'); // 'day'
     * ```
     */
    private static normalizeUnit;
    /**
     * 计算指定年月的天数（即该月的最大日期）。
     *
     * 通过构造下个月的第 0 天来获取当前月份的最后一天，可自动处理闰年的 2 月。
     *
     * @param year - 四位年份，例如 `2024`
     * @param month - 月份索引，从 0 开始（0 表示 1 月，11 表示 12 月）
     * @returns 该月份包含的天数（28 ~ 31）
     * @example
     * ```ts
     * DateTime['daysInMonth'](2024, 1); // 29（2024 年为闰年）
     * DateTime['daysInMonth'](2023, 1); // 28
     * ```
     */
    private static daysInMonth;
    /**
     * 在基准日期上偏移指定的月份数，并对溢出的日期进行夹取（clamp）。
     *
     * 例如对 1 月 31 日加 1 个月时，由于 2 月没有 31 日，会被夹取到该月的最后一天，
     * 避免出现日期自动进位到下个月的问题。
     *
     * @param baseDate - 基准日期
     * @param months - 偏移的月份数，可为负数表示往前偏移
     * @returns 偏移后的新 Date 对象（不会修改入参）
     * @example
     * ```ts
     * DateTime['shiftMonth'](new Date(2023, 0, 31), 1); // 2023-02-28
     * DateTime['shiftMonth'](new Date(2023, 2, 15), -1); // 2023-02-15
     * ```
     */
    private static shiftMonth;
    /**
     * 日期时间加法。
     *
     * 在给定日期上增加指定的时间量。年、月运算会对溢出日期做夹取处理
     * （参见 {@link DateTime.shiftMonth}），日、时、分、秒运算则基于毫秒进行精确累加。
     *
     * @param input - 输入日期，{@link DateLike} 类型
     * @param value - 增加的数值，可为负数（负数等价于减法）
     * @param unit - 增加单位，默认 `day`，支持 {@link DateUnit} 的所有写法
     * @returns 计算后的新 Date 对象（不会修改入参）
     * @throws 当 `value` 不是有限数字（如 `NaN`、`Infinity`）时抛出 `Invalid value`
     * @example
     * ```ts
     * DateTime.add('2023-10-01', 1, 'day');    // 2023-10-02
     * DateTime.add('2023-10-01', 1, 'month');  // 2023-11-01
     * DateTime.add('2023-01-31', 1, 'month');  // 2023-02-28（自动夹取）
     * DateTime.add('2023-10-01', -2, 'hour');  // 2023-09-30 22:00:00
     * ```
     */
    static add(input: DateLike, value: number, unit?: DateUnit): Date;
    /**
     * 日期时间减法。
     *
     * 在给定日期上减少指定的时间量，内部等价于调用 {@link DateTime.add} 并取负数。
     *
     * @param input - 输入日期，{@link DateLike} 类型
     * @param value - 减少的数值，可为负数（负数等价于加法）
     * @param unit - 减少单位，默认 `day`，支持 {@link DateUnit} 的所有写法
     * @returns 计算后的新 Date 对象（不会修改入参）
     * @throws 当 `value` 不是有限数字（如 `NaN`、`Infinity`）时抛出 `Invalid value`
     * @example
     * ```ts
     * DateTime.subtract('2023-10-02', 1, 'day');   // 2023-10-01
     * DateTime.subtract('2023-11-01', 1, 'month'); // 2023-10-01
     * DateTime.subtract('2023-10-01', 30, 'minute'); // 2023-09-30 23:30:00
     * ```
     */
    static subtract(input: DateLike, value: number, unit?: DateUnit): Date;
    /**
     * 数字格式化，在左侧补 0 至指定长度。
     *
     * @param num - 要格式化的数字
     * @param len - 目标字符串长度，默认 `2`；当数字本身长度已达到或超过该值时原样返回
     * @returns 补 0 后的字符串
     * @example
     * ```ts
     * DateTime.fillZero(0);     // "00"
     * DateTime.fillZero(9);     // "09"
     * DateTime.fillZero(23);    // "23"
     * DateTime.fillZero(5, 3);  // "005"
     * ```
     */
    static fillZero(num: number, len?: number): string;
    /**
     * 日期时间格式化。
     *
     * 将日期按照给定的格式模板输出为字符串，支持常用模式（如 `yyyy-MM-dd HH:mm:ss`、
     * `MM/dd/yyyy`、`yyyy年MM月dd日`）以及自定义组合。
     *
     * 支持的占位符：
     * - `yyyy` / `YYYY`：四位年份；`yy` / `YY`：两位年份
     * - `MM`：两位月份；`M`：不补零月份
     * - `dd` / `DD`：两位日期；`d` / `D`：不补零日期
     * - `HH` / `hh`：两位小时（24 小时制）；`H` / `h`：不补零小时
     * - `mm`：两位分钟；`m`：不补零分钟
     * - `ss` / `SS`：两位秒；`s` / `S`：不补零秒
     * - `fff`：三位毫秒
     *
     * @param input - 输入日期，可以是 Date 对象、时间戳（毫秒/秒）或日期字符串
     * @param format - 输出格式模板，包含上述占位符
     * @returns 格式化后的日期字符串
     * @throws 当输入既不是 Date，也不是 number 或 string 时抛出 `Invalid date input`
     * @example
     * ```ts
     * DateTime.format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // "2023-10-01 12:00:00"
     * DateTime.format('2023-10-01T12:00:00Z', 'MM/dd/yyyy'); // "10/01/2023"
     * DateTime.format('2023-10-01', 'MM/dd/yyyy'); // "10/01/2023"
     * DateTime.format('2023/10/01', 'MM/dd/yyyy'); // "10/01/2023"
     * DateTime.format(1709452800000, 'yyyy年MM月dd日'); // "2024年03月03日"
     * ```
     */
    static format(input: DateLike, format: string): string;
    /**
     * 将多种格式的输入解析为 Date 对象。
     *
     * 解析时会先将 `/`、`.` 等分隔符统一替换为 `-`，再根据字符串长度与格式匹配相应的解析规则：
     * - 仅年份（`2023`）或年月（`2023-10`）：自动补全为该月/年的第一天
     * - 标准日期（`2023-10-01`）：按本地时间 00:00:00 解析
     * - 紧凑日期（`20231001`）/ 紧凑日期时间（`20231001010101`）：按位切分解析
     * - 13 位数字：按毫秒时间戳解析；10 位数字：按秒时间戳解析
     * - 其余情况回退到原生 `new Date()` 解析
     *
     * 若入参已是 Date 对象，则原样返回（不会拷贝）。
     *
     * @param str - 待解析的日期，{@link DateLike} 类型
     * @returns 解析后的 Date 对象
     * @throws 当解析过程中发生异常时抛出 `Invalid date string`
     * @example
     * ```ts
     * DateTime.toDate('2023');            // 2023-01-01 00:00:00
     * DateTime.toDate('2023-01');         // 2023-01-01 00:00:00
     * DateTime.toDate('2023-10-01');      // 2023-10-01 00:00:00
     * DateTime.toDate('2023/10/01');      // 2023-10-01 00:00:00
     * DateTime.toDate('2023.10.01');      // 2023-10-01 00:00:00
     * DateTime.toDate('20241001010101');  // 2024-10-01 01:01:01
     * DateTime.toDate('1709452800000');   // 毫秒时间戳
     * DateTime.toDate('1709452800');      // 秒时间戳
     * ```
     */
    static toDate(str: DateLike): Date;
    /**
     * 计算两个日期之间的时间差（`date1 - date2`）。
     *
     * 按指定单位返回差值并向下取整（`Math.floor`）。当 `date1` 早于 `date2` 时结果为负数。
     * 若 `type` 不属于已知单位，则返回两者毫秒差的绝对值。
     *
     * @param date1 - 第一个日期（被减数），{@link DateLike} 类型
     * @param date2 - 第二个日期（减数），{@link DateLike} 类型
     * @param type - 时间单位，支持 `second`（默认）、`minute`、`hour`、`day`；其他值返回毫秒差绝对值
     * @returns 按指定单位计算的时间差
     * @throws 当任一入参无法被 {@link DateTime.toDate} 解析时抛出 `Invalid date string`
     * @example
     * ```ts
     * DateTime.diff('2023-10-02', '2023-10-01');           // 86400（秒）
     * DateTime.diff('2023-10-02', '2023-10-01', 'minute'); // 1440
     * DateTime.diff('2023-10-02', '2023-10-01', 'hour');   // 24
     * DateTime.diff('2023-10-02', '2023-10-01', 'day');    // 1
     * DateTime.diff('2023-10-01', '2023-10-02', 'day');    // -1
     * ```
     */
    static diff(date1: DateLike, date2: DateLike, type?: string): number;
}
export default DateTime;
