import 'core-js/stable/reflect';
/**
 * Logger 配置项
 * @since 1.0.0
 * @example
 * const logger = Logger({level: "WARN", showTime: true, name: "MyLogger"})
 * logger.info("this is info") // 不会打印
 * logger.log("this is log") // 不会打印
 * logger.warn("this is warn") // [2024/06/01 12:00:00:000] [MyLogger] [WARN] this is warn
 * logger.error("this is error") // [2024/06/01 12:00:00:000] [MyLogger] [ERROR] this is error
 */
export interface LoggerOptions {
    /**
     * 日志等级, INFO | LOG | WARN | ERROR, 默认为 INFO, 只会打印 INFO 及以上等级的日志
     * @default "INFO"
     * @since 1.0.0
     * @example
     * const logger = Logger({level: "WARN"})
     * logger.info("this is info") // 不会打印
     * logger.log("this is log") // 不会打印
     * logger.warn("this is warn") // 会打印
     * logger.error("this is error") // 会打印
     */
    level?: 'INFO' | 'LOG' | 'WARN' | 'ERROR';
    /**
     * 是否在日志前面添加时间戳, 默认为 false
     * @default false
     * @since 1.0.0
     * @example
     * const logger = Logger({showTime: true})
     * logger.log("this is log") // [2024/06/01 12:00:00:000] [LOG] this is log
     */
    showTime?: boolean;
    /**
     * 日志前缀, 默认为空字符串
     * @default ""
     * @since 1.0.0
     * @example
     * const logger = Logger({name: "MyLogger"})
     * logger.log("this is log") // [MyLogger] [LOG] this is log
     */
    name?: string;
}
export interface LoggerInterface {
    info: Console['info'];
    log: Console['log'];
    warn: Console['warn'];
    error: Console['error'];
    getVersion: () => string;
}
export declare const _$LoggerStyle$_: {
    info: string;
    log: string;
    warn: string;
    error: string;
};
export declare const _$LoggerNameStyle$_ = "background: green;color: #fff";
/**
 * logger 调试日志管理
 *
 * 支持四个日志等级 INFO | LOG | WARN | ERROR
 *
 * 支持通过 `context(key)` 派生互相隔离的多上下文实例
 *
 * @example
 *
 * const logger = new Logger({level: "INFO"})
 * logger.log("this is log")
 */
export declare class LoggerCls implements LoggerInterface {
    private static readonly noop;
    private _options;
    private _levelNum;
    /**
     * 上下文注册表, key -> 隔离的 logger 实例
     *
     * 使用无原型对象, 避免 `constructor`、`__proto__` 等 key 命中原型链
     * @private
     */
    private _contexts;
    constructor(options?: LoggerOptions);
    /**
     * 信息日志 console.info
     *
     * @example
     * logger.info("info") // [INFO] info
     */
    info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    /**
     * 日志 console.log
     *
     * @example
     * logger.log("log") // [LOG] log
     */
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    /**
     * 警告日志 console.warn
     *
     * @example
     * logger.warn("warn") // [WARN] warn
     */
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    /**
     * 错误日志 console.error
     *
     * @example
     * logger.error("error") // [ERROR] error
     */
    error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    /**
     * 更新配置, 日志等级会重新衡量是否打印
     *
     * 只作用于当前实例, 不会影响父实例, 也不会影响已创建的上下文实例
     * @param {LoggerOptions} options 配置
     * @example
     * logger.setOptions({level: "WARN"}) // 只打印 warn和error 的日志
     */
    setOptions(options: LoggerOptions): void;
    /**
     * Private method used to match logger level
     * @private
     *
     * @example
     * this._matchLevel("INFO") // 3
     *
     * @param {LoggerLevel} level logger level
     * @return {number}
     */
    private _matchLevel;
    /**
     * Logger factory
     * @private
     * @param {ConsoleKey} type
     * @param {boolean} bool
     * @returns
     */
    private _loggerFactory;
    getOptions(): LoggerOptions;
    /**
     * 按 key 获取一个隔离的上下文 logger, 同一个 key 始终返回同一个实例
     *
     * - **隔离**: 上下文实例拥有独立的配置, 对它调用 `setOptions` 不会影响父实例, 也不会影响其他上下文
     * - **继承**: 创建时继承父实例**当时**的配置(level / showTime 等), 之后父子互不影响
     * - **前缀**: 只显示自己的 key, 即 `[key] [LEVEL]`, 不会带上父实例的 name
     *
     * @since 2.1.0
     * @param {string} key 上下文标识, 同时作为日志前缀
     * @returns {LoggerCls} 该 key 对应的隔离实例(带时间戳代理)
     * @example
     * const logger = Logger({name: "EZUIKIT", level: "WARN"})
     *
     * const player = logger.context("player")
     * player.log("ready") // [player] [LOG] ready 不会带 EZUIKIT
     *
     * // 同名复用, 拿到的是同一个实例
     * logger.context("player") === player // true
     *
     * // 继承父实例创建时的配置
     * player.getOptions().level // "WARN"
     *
     * // 隔离: 只影响 player 自己
     * player.setOptions({level: "INFO"})
     * logger.getOptions().level // 仍然是 "WARN"
     */
    context(key: string): LoggerCls;
    /**
     * 是否已经创建过某个上下文
     * @since 2.1.0
     * @param {string} key 上下文标识
     * @returns {boolean}
     */
    hasContext(key: string): boolean;
    /**
     * 获取已创建的上下文 key 列表
     * @since 2.1.0
     * @returns {string[]}
     * @example
     * logger.context("player")
     * logger.context("talk")
     * logger.getContexts() // ["player", "talk"]
     */
    getContexts(): string[];
    /**
     * 移除某个上下文, 移除后再次 `context(key)` 会创建一个新的实例
     *
     * 已经被外部持有的旧实例仍然可用, 只是不再被复用
     * @since 2.1.0
     * @param {string} key 上下文标识
     * @returns {boolean} 是否真的移除了
     */
    removeContext(key: string): boolean;
    /**
     * 获取版本号
     * @returns {string}
     */
    getVersion(): string;
    static VERSION: string;
}
export declare function __$currentTimeStr(): string;
export declare const __$CONSOLE_LIST$__: string[];
/**
 * 包装 Logger 实例, 返回可在日志前自动添加时间戳的 Proxy 对象
 *
 * 抽出来复用, 保证 `Logger()` 与 `logger.context()` 创建的实例行为一致
 * @param {LoggerCls} logger Logger 实例
 * @returns {LoggerCls}
 */
export declare function __$createLoggerProxy(logger: LoggerCls): LoggerCls;
/**
 *  Logger 工厂函数, 返回一个 Logger 实例的 Proxy 对象, 可以在日志前面自动添加时间戳
 * @example
 * const logger = Logger({level: "INFO", showTime: true})
 * logger.log("this is log") // [2024/06/01 12:00:00:000] [LOG] this is log
 *
 * // 多上下文: 每个 key 对应一个隔离实例
 * const player = logger.context("player")
 * player.log("this is log") // [player] [LOG] this is log
 * @param options Logger 配置项
 * @returns Logger 实例
 */
declare function Logger(options?: LoggerOptions): LoggerCls;
export default Logger;
