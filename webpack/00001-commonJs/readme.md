<!--info-header-start-->
<h1>
  what is commonJs
</h1>
<!--info-header-end-->

####CommonJS 是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS，后来为了体现它的广泛性，修改为CommonJS规范。Node 是 CommonJS在服务器端一个具有代表性的实现。
####正是因为Node中对CommonJS进行了支持和实现，所以它具备以下几个特点：

- 在Node中每一个js文件都是一个单独的模块
- 该模块中，包含CommonJS规范的核心变量: exports、module.exports、require
- 使用核心变量，进行模块化开发

```js
  // 在a.js中导出变量
  const name = "余国平";
  const age = "27";
  module.exports = { name, age };
  // 或者
  exports.name = "余国平";
  exports.age = "27";

  // 在b.js中引用导出的变量
  const { name, age } = require("./a.js");
  console.log( name , age )
```

####CommonJs模块化实现原理
定义文件
```js
  // name.js
  module.exports = "余国平";
```

```js
  // main.js
  let author = require("./name.js");
  console.log(author, "author");
```

经过webpack@5.76.1,webpack-cli@5.0.1打包的产物
```js
  // webpack 配置
  module.exports = {
    entry: {
      main: './src/main.js',
    },
    mode: "development",
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
```

构建结果
```js
(() => {
  // 定义局部变量，防止污染全局环境变量，模块化代码，提高代码质量
  var __webpack_modules__ = {
    // 缓存模块代码，不使用不解析编译
    "./src/demo.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      // eval 用于懒加载
      eval(
        'const buttonEle = document.getElementById("button");\n\nbuttonEle.onclick = function () {\n  (__webpack_require__(/*! ./test */ "./src/test.js").then)((module) => {\n    const print = module.default;\n    print();\n  });\n};\n\n//# sourceURL=webpack://webpack/./src/demo.js?'
      );
    },
    "./src/test.js": (module) => {
      eval(
        "module.exports = () => {\n  console.log('按钮点击了')\n}\n\n//# sourceURL=webpack://webpack/./src/test.js?"
      );
    },
  };
  // 模块结果缓存
  var __webpack_module_cache__ = {};

  // 定义 require 函数
  function __webpack_require__(/* 模块唯一标识 */moduleId) {
    // 检查模块是否在缓存中
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      // 若缓存则直接返回
      return cachedModule.exports;
    }
    // 创建一个新模块的缓存并且定义（这一步也是解决循环调用）
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // 解析编译模块
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  // 开始加载入口文件
  var __webpack_exports__ = __webpack_require__("./src/demo.js");
})();
```

####CommonJs模块化解析流程
![思维导图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85cf9ace26ee4696859206bd275052eb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)


#### 模块发展史
https://segmentfault.com/a/1190000023017398
https://huangxuan.me/js-module-7day/#/64
https://juejin.cn/post/6844903576309858318