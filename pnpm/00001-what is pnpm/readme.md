<!--info-header-start-->
<h1>
  what is pnpm
</h1>
<!--info-header-end-->

***pnpm是一个npm的替代方案，用于管理js依赖版本的工具。([为什么用pnpm](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html))***

###pnpm 的实现方式
***对于npm(v3+)和yarn，其存储方式是扁平依赖树(flattened dependency trees)，该存储方式会造成幽灵依赖的可能性(源码可以直接访问和修改依赖，而不是作为只读的项目依赖)***

***对于pnpm而言，pnpm 使用符号链接将项目的直接依赖项添加到模块目录的根目录中。[详情](https://pnpm.io/zh/symlinked-node-modules-structure)***

***假设您安装了依赖于 bar@1.0.0 的 foo@1.0.0。 pnpm 会将两个包硬链接到 node_modules 如下所示 ([ex.](https://github.com/zkochan/comparing-node-modules/tree/master/pnpm5-example/node_modules))：***
```js
  node_modules
  ├── .pnpm
  │   ├── bar@1.0.0
  │   │   └── node_modules
  │   │       └── bar -> <store>/bar
  │   │           ├── index.js
  │   │           └── package.json
  │   └── foo@1.0.0
  │       └── node_modules
  │           └── foo -> <store>/foo
  │               ├── index.js
  │               └── package.json
  ├── bar -> ./.pnpm/bar@1.0.0/node_modules/bar
  └── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
````

###这种形式的存储有什么优势？
- ./node_modules 下只存在仓库拥有访问权限的包(仓库依赖的包([ex.](https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html))
- 避免生成扁平依赖树的复杂算法，节省磁盘空间[ex.](https://pnpm.io/zh/motivation#%E8%8A%82%E7%9C%81%E7%A3%81%E7%9B%98%E7%A9%BA%E9%97%B4)
- 部分依赖的子依赖可能存在多份
- 提高安装速度([ex.](https://pnpm.io/zh/motivation#%E6%8F%90%E9%AB%98%E5%AE%89%E8%A3%85%E9%80%9F%E5%BA%A6))


###如何存储 peerDependencies([ex.](https://pnpm.io/zh/how-peers-are-resolved))



