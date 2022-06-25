<!--info-header-start-->
<h1>
  package.json
</h1>
<!--info-header-end-->

**name**
表示模块的名字。

如果你要发布模块，则 *name* 字段和 *version* 字段是必备的；
如果你不需要发布，则 *name* 字段和 *version* 字段是可选的。
*name* 字段和 *version* 字段共同决定模块的唯一标识。

name定义规则:
- 命名长度需要少于等于 *214* 字符（包含私有仓库前缀）
Example:
```js
  // 定义
  {
    // scope：私有仓库
    // name：包名
    name: "@[scope]/[name]"
  }

  // 安装
  npm i @[scope]/[name]
```
- 可以用 **.** 或 **_** 作为开始字符
- 命名必须是小写字母
- 因为name字段在下载npm包时，会应用于url中，所以不能带任何不安全的URL字符。

name定义规范:
- 不要在同一私有仓库下定义同一模块名
- 不要再模块名中增加 **'js'** 或 **‘node’**，使用package.json文件，系统就已经假定你正在书写js
- 模块命名尽量简短且具有语义化
- 你可以在npm上查看是否已有同名包 [npm](https://www.npmjs.com/)
****

**version**
表示模块版本号。

模块版本号必须可以被[node-semver](https://github.com/npm/node-semver)解析。

版本号格式:
major(主版本号).minor(次版本号).patch(修补版本号)
major(主版本号): 新的架构调整，不兼容老版本
minor(次版本号): 新增功能，兼容老版本
patch(修补版本号): 修复bug，兼容老版本

版本号定义规则
- ^：只会执行不更改最左边非零数字的更新
```js
  ^0.13.0: 更新范围 [0.13.0, 0.14.0)
  ^0.13.2: 更新范围 [0.13.2, 0.14.0)

  ^1.5.10: 更新范围 [1.5.10, 2.0.0)
  ^2.7.0: 更新范围 [2.7.0, 3.0.0)
```

- ~：大概匹配某个版本
```js
  ～1.5.1: 更新范围 [1.5.0, 1.6.0)
  ～1.5: 更新范围 [1.5.0, 1.6.0)
  ～1: 更新范围 [1.0.0, 2.0.0)
```
- -: 一定范围的版本。
```js
  2.1.0 - 2.6.2: [2.1.0, 2.6.2]
```

- ||: 组合集合
```js
  <2.1 || >2.6: 小于2.1 且 大于2.6版本
```

- *: 任意版本

- &#62;：高于指定版本的任何版本

- &#62;=: 等于或高于指定版本的任何版本。

- <: 低于指定版本的任何版本。

- <=: 等于或低于指定版本的任何版本。

- =: 确切的版本。
****

**description**
模块包的功能描述，可以被 npm search 检索。
****

**keywords**
模块的关键内容，可以被 npm search 检索。
****

**homepage**
模块主页
****

**bugs**
模块bug上报地址，可以是仓库 issue 或者 个人邮件地址。
仅是 string 可以被 npm bugs 调用
****

**license**
模块项目协议 [具体细节](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#license)
****

**author**
作者个人信息。

Example:
```js
  {
    "name" : "yuguoping",
    "email" : "475919588@qq.com",
    "url" : "https://github.com/"
  }
```
or
```js
  {
    "author": "yuguoping <475919588@qq.com> (https://github.com/)"
  }
```
****

**contributors**
协作者信息。
格式是一个对象数组。对象内容和author一致。
****

**funding**
赞助商信息
****


**files**
****
表示白名单，声明有哪些文件，是需要作为依赖项，被使用者安装；语法类似 .gitignore

可以配置 .npmignore 文件排除不需要保留的文件，若 .npmignore 不存在则会使用 .gitignore 的内容.

使用优先级： files > .npmignore > .gitignore

以下内容一定会被保留（忽视配置文件）:
- package.json
- README
- LICENSE / LICENCE
- package.json 中 "main" 字段的内容块

以下内容会被忽视:
- .git
- CVS
- .svn
- .hg
- .lock-wscript
- .wafpickle-N
- .*.swp
- .DS_Store
- ._*
- npm-debug.log
- .npmrc
- node_modules
- config.gypi
- *.orig
- package-lock.json (如果你想上传可以参考这个 [npm-shrinkwrap.json](https://docs.npmjs.com/cli/v8/configuring-npm/npm-shrinkwrap-json))
****

**main**
模块代码的主要入口，默认配置读取 index.js
****

**browser**
在客户端使用模块会 browser 字段作为模块主入口（而不是 main 字段）
****

**bin**
模块对外暴露的脚本命令。

Example:
```js
  {
    "bin": {
      "myapp": "./cli.js"
    }
  }
```
****

**man**
man 命令是 Linux 中的帮助指令，通过该指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息
****

**directories**
directories 字段用来规范项目的目录。node.js 模块是基于 CommonJS 模块化规范实现的，需要严格遵循 CommonJS 规范。模块目录下除了必须包含包项目描述文件 package.json 以外，还需要包含以下目录：

- bin ：存放可执行二进制文件的目录
- lib ：存放js代码的目录
- doc ：存放文档的目录
- test ：存放单元测试用例代码的目录
- ...

在实际的项目目录中，我们可能没有按照这个规范进行命名，那么就可以在directories字段指定每个目录对应的文件路径：
```js
"directories": {
  "bin": "./bin",
  "lib": "./lib",
  "doc": "./doc",
  "test" "./test",
  "man": "./man"
}
```

这个属性实际上没有什么实际的作用，当然不排除未来会有什么比较有意义的用处。
****

**repository**
明确代码仓库地址

通常有两种书写形式。
字符串形式：
```js
  "repository": "https://github.com/facebook/react.git"
```

对象的形式：
```js
  // 可以显式地设置版本控制系统
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git"
  }
```
****

**scripts**
scripts 是 package.json中内置的脚本入口，是key-value键值对配置，key为可运行的命令，可以通过 npm run 来执行命令。

通过配置scripts属性，可以定义一些常见的操作命令：
```js
  "scripts": {
    "test": "echo test",
    "build": "father-build --config .fatherrc.js",
    "release": "node scripts/release.js",
    "pre-release": "node scripts/release.js --pre",
    "docs": "docit start"
  },
```

[更多配置](https://docs.npmjs.com/cli/v8/using-npm/scripts)
****

**config**
config字段用来配置scripts运行时的配置参数，如下所示：

```js
  {
    "name": "foo",
    "config": {
      "port": "8080"
    }
  }
```

如果运行npm run start，则port字段会映射到 *npm_package_config_port* 环境变量中：

```js
  console.log(process.env.npm_package_config_port) // 3000
```
****

