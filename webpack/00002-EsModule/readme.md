<!--info-header-start-->
<h1>
  what is es module
</h1>
<!--info-header-end-->

Nodejs  借鉴了  Commonjs  实现了模块化 。从  ES6  开始， JavaScript  才真正意义上有自己的模块化规范。
Es Module 的产生有很多优势，比如:

- 借助  Es Module  的静态导入导出的优势，实现了  tree shaking（后续文章会重点讲到）
- Es Module  还可以  import()  懒加载方式实现代码分割（下篇文章会进行详情讲解）

在  Es Module  中用  export  用来导出模块，import  用来导入模块。

```js
  /**
   * 导出
   */
  export * from 'module'; //重定向导出 不包括 module内的default
  export { name1 } from 'module'; // 重定向命名导出
  export { import1 as name1, import2 as name2 } from 'module'; // 重定向重命名导出
  export { name1, name2, nameN }; // 与之前声明的变量名绑定 命名导出
  export let name1 = 'name1'; // 声明命名导出 或者 var, const，function， function*, class
  export default expression; // 默认导出
  export default function () { ... } // 或者 function*, class
  export default function name1() { ... } // 或者 function*, class

  /**
   * 导入
   */
  import defaultExport from "module"; // 默认导入
  import { a, b, c } from "module"; //解构导入
  import defaultExport, { a, b, c as newC } from "module"; //混合导入
  import * as name from "module"; //混合导入
  var promise = import("module"); //动态导入(异步导入)
```

####CommonJs 模块化实现原理
定义文件

```js
// test.js
export default () => {
  console.log("按钮点击了");
};
```

```js
// demo.js
const buttonEle = document.getElementById("button");

buttonEle.onclick = function () {
  import("./test").then((module) => {
    const print = module.default;
    print();
  });
};
```

经过webpack@5.76.1,webpack-cli@5.0.1打包的产物

```js
// webpack 配置
module.exports = {
  entry: {
    main: "./src/demo.js",
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

构建结果

```js
// main.js
(() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    // 加载进去时 还没有解析
    "./src/demo.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'const buttonEle = document.getElementById("button");\n\nbuttonEle.onclick = function () {\n  __webpack_require__.e(/*! import() */ "src_test_js").then(__webpack_require__.bind(__webpack_require__, /*! ./test */ "./src/test.js")).then((module) => {\n    const print = module.default;\n    print();\n  });\n};\n\n//# sourceURL=webpack://webpack/./src/demo.js?'
      );
      // const buttonEle = document.getElementById("button");
      // buttonEle.onclick = function () {
      //   // 开始缓存 script 读取到 __webpack_modules__(模块定义)
      //   __webpack_require__
      //     .e(/*! import() */ "src_test_js")
      //     // script缓存完毕(但并没有解析)
      //     .then(
      //       // 开始解析 script & 读取到 __webpack_module_cache__(模块结果)
      //       __webpack_require__.bind(
      //         __webpack_require__,
      //         /*! ./test */ "./src/test.js"
      //       )
      //     )
      //     .then((module) => {
      //       // debugger
      //       console.log("then", module, performance.now());
      //       const print = module.default;
      //       print();
      //     });
      // }; //# sourceURL=webpack://webpack/./src/demo.js?
      /***/
    },
  };

  /************************************************************************/
  // 模块结果缓存
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    // 这时候 并没有缓存下结果 （仅在 __webpack_modules__ 中缓存了模块）
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // 开始解析模块
    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = __webpack_modules__;

  /* webpack/runtime/define property getters */
  (() => {
    // 定义属性
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  /* webpack/runtime/ensure chunk */
  (() => {
    __webpack_require__.f = {};
    // 加载模块
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = (chunkId) => {
      return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          __webpack_require__.f[key](chunkId, promises);
          // promise 被 resolve script 缓存完成
          return promises;
        }, [])
      );
    };
  })();

  /* webpack/runtime/get javascript chunk filename */
  (() => {
    // 文件名
    // This function allow to reference async chunks
    __webpack_require__.u = (chunkId) => {
      // return url for filenames based on template
      return "" + chunkId + ".js";
    };
  })();

  /* webpack/runtime/global */
  (() => {
    // 全局this获取
    __webpack_require__.g = (function () {
      if (typeof globalThis === "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (typeof window === "object") return window;
      }
    })();
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    // 属性是否存在
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  /* webpack/runtime/load script */
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "webpack:";
    // loadScript function to load a script via script tag
    // 加载 script 方法
    __webpack_require__.l = (url, done, key, chunkId) => {
      // 为什么
      if (inProgress[url]) {
        inProgress[url].push(done);
        return;
      }
      var script, needAttach;
      if (key !== undefined) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i];
          if (
            s.getAttribute("src") == url ||
            s.getAttribute("data-webpack") == dataWebpackPrefix + key
          ) {
            script = s;
            break;
          }
        }
      }
      if (!script) {
        needAttach = true;
        script = document.createElement("script");

        script.charset = "utf-8";
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        script.setAttribute("data-webpack", dataWebpackPrefix + key);
        script.src = url;
      }
      inProgress[url] = [done];
      // 加载&解析完成删除script标签
      var onScriptComplete = (prev, event) => {
        console.log(performance.now());
        // debugger
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach((fn) => fn(event));
        // 若存在多个 onerror ｜ onload 则会调用之前的函数
        if (prev) return prev(event);
      };
      var timeout = setTimeout(function () {
        // 兜底方案
        console.log("timeout");
        onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script,
        });
      }, 120000);
      // 保证之前挂载的 onerror ｜ onload 也能被调用
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      // 开始解析模块 进入指定模块内部 内部调用 webpackJsonpCallback 加载script
      needAttach && document.head.appendChild(script);
    };
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // 定义 es module 属性, Object.prototype.toString斯奥用结果为 [object Module]
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();

  /* webpack/runtime/publicPath */
  (() => {
    // 解析路径
    var scriptUrl;
    if (__webpack_require__.g.importScripts)
      scriptUrl = __webpack_require__.g.location + "";
    var document = __webpack_require__.g.document;
    if (!scriptUrl && document) {
      if (document.currentScript) scriptUrl = document.currentScript.src;
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName("script");
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
      }
    }
    // When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
    // or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
    if (!scriptUrl)
      throw new Error("Automatic publicPath is not supported in this browser");
    // 获取当前访问页面的路径
    scriptUrl = scriptUrl
      // 替换 hash
      .replace(/#.*$/, "")
      // 替换 query
      .replace(/\?.*$/, "")
      // 替换访问地址的文件名（匹配 /*）
      .replace(/\/[^\/]+$/, "/");
    __webpack_require__.p = scriptUrl;
  })();

  /* webpack/runtime/jsonp chunk loading */
  (() => {
    // no baseURI

    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    // 依赖的模块是否安装 0: 已加载模块; [resolve, reject, Promise]: 正在加载模块
    var installedChunks = {
      main: 0,
    };

    // 准备加载 script 完成的 promise & 加载失败兜底信息提示
    __webpack_require__.f.j = (chunkId, promises) => {
      // JSONP chunk loading for javascript
      var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
      if (installedChunkData !== 0) {
        // 0 means "already installed".

        // a Promise means "currently loading".
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (true) {
            // all chunks have JS
            // setup Promise in chunk cache
            var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            promises.push((installedChunkData[2] = promise));

            // start chunk loading
            var url = __webpack_require__.p + __webpack_require__.u(chunkId);
            // create error before stack unwound to get useful stacktrace later
            var error = new Error();
            var loadingEnded = (event) => {
              // debugger
              // 若已经加载依赖 或者 正在加载依赖
              if (__webpack_require__.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                // installedChunkData !== 0 则表示依赖加载失败
                if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  // 异常处理
                  var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  error.name = "ChunkLoadError";
                  error.type = errorType;
                  error.request = realSrc;
                  // 调用 reject 方法
                  installedChunkData[1](error);
                }
              }
            };
            // 挂载 script
            __webpack_require__.l(
              url,
              loadingEnded,
              "chunk-" + chunkId,
              chunkId
            );
          } else installedChunks[chunkId] = 0;
        }
      }
    };

    // no prefetching

    // no preloaded

    // no HMR

    // no HMR manifest

    // no on chunks loaded

    // install a JSONP callback for chunk loading
    // 加载解析模块
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      //              src_test_js
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0;
      // 挂载组件到 __webpack_modules__
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            // 挂载组件到 __webpack_modules__ ，但还没有解析组件（调用eval）
            __webpack_require__.m[moduleId] = moreModules[moduleId];
          }
        }
        //              runtime 是干嘛的？
        if (runtime) var result = runtime(__webpack_require__);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      console.log("chunkLoadingGlobal", chunkLoadingGlobal);
      // 明确组件是否挂载的标识 installedChunks
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          // 调用 promise 告知 script 缓存成功
          // installedChunks[chunkId][0] 是 resolve
          installedChunks[chunkId][0]();
        }
        // 成功达标
        installedChunks[chunkId] = 0;
      }
    };

    var chunkLoadingGlobal = (self["webpackChunkwebpack"] =
      self["webpackChunkwebpack"] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    // 模块的解析函数
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
  })();

  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/demo.js");
})();
```

```js
// src_test_js.js
"use strict";
// 开始加载模块信息
(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([
  ["src_test_js"],
  {
    "./src/test.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  console.log("按钮点击了");\n});\n\n//# sourceURL=webpack://webpack/./src/test.js?'
        );

        // // 定义 es module 标
        // __webpack_require__.r(__webpack_exports__);
        // // 定义属性
        // __webpack_require__.d(__webpack_exports__, {
        //   default: () => __WEBPACK_DEFAULT_EXPORT__,
        // });
        // const __WEBPACK_DEFAULT_EXPORT__ = () => {
        //   console.log("按钮点击了");
        // }; //# sourceURL=webpack://webpack/./src/test.js?
      },
  },
]);
```

####es module 模块化解析流程
![思维导图](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/097982ecf06041b5b5d35ca7b389c308~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
