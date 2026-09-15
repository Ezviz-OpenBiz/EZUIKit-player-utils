## Logger

日志工具类

## scripts

```bash

# http://localhost:3000
pnpm run dev

pnpm run build

```

## 使用

```bash
pnpm install @ezuikit/utils-logger

```

```ts
export interface LoggerOptions {
  level?: 'INFO' | 'LOG' | 'WARN' | 'ERROR';
  showTime?: boolean;
  name?: string;
}
```

```ts
import Logger from '@ezuikit/utils-logger';

const logger = new Logger({ level: 'INFO' });

logger.info('info');
logger.log('log');
logger.warn('warn');
logger.error('error');

// 更改日志等级 WARN 只打印 warn error
logger.setOptions({ level: 'WARN' });

logger.info('setOptions info');
logger.log('setOptions log');
logger.warn('setOptions warn');
logger.error('setOptions error');
```

## 多上下文 (context)

`context(key)` 按 key 拿到一个**互相隔离**的 logger 实例，同一个 key 始终返回同一个实例，不需要自己在业务里到处传引用。

```ts
const logger = Logger({ name: 'EZUIKIT', level: 'WARN' });

const player = logger.context('player');
player.warn('ready'); // [player] [WARN] ready

// 同名复用，拿到的是同一个实例
logger.context('player') === player; // true
```

三条语义：

**隔离** — 每个上下文有自己的配置，`setOptions` 只影响自己，不会影响父实例，也不会影响其他上下文。

```ts
const player = logger.context('player');
const talk = logger.context('talk');

player.setOptions({ level: 'INFO' });

player.getOptions().level; // "INFO"
logger.getOptions().level; // "WARN"  父实例不受影响
talk.getOptions().level; // "WARN"  其他上下文不受影响
```

**继承** — 创建时继承父实例**当时**的配置（`level`、`showTime` 等）。之后父实例再改配置，不会追溯到已创建的上下文。

```ts
const logger = Logger({ level: 'INFO' });
const before = logger.context('before'); // 继承到 INFO

logger.setOptions({ level: 'ERROR' });
const after = logger.context('after'); // 继承到 ERROR

before.getOptions().level; // "INFO"  不被追溯修改
```

**前缀只显示自己的 key** — 不会带上父实例的 `name`，也不会随嵌套层级累积。

```ts
const logger = Logger({ name: 'EZUIKIT' });
logger.log('x'); // [EZUIKIT] [LOG] x
logger.context('player').log('x'); // [player] [LOG] x
logger.context('player').context('hls').log('x'); // [hls] [LOG] x
```

### 注册表管理

```ts
logger.context('player');
logger.context('talk');

logger.getContexts(); // ["player", "talk"]  已创建的 key 列表
logger.hasContext('player'); // true
logger.removeContext('talk'); // true，移除后再 context("talk") 会创建新实例
```

上下文实例长期持有会一直占着内存，播放器这类会反复创建销毁的场景，销毁时用 `removeContext(key)` 清掉即可。已经被外部持有的旧实例仍然可用，只是不再被复用。
