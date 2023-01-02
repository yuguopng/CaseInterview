<!--info-header-start-->
<h1>
  深拷贝
</h1>
<!--info-header-end-->

> Q：实现一个深拷贝

*深拷贝和浅拷贝的区别*
**浅拷贝**
![浅拷贝](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce894a1f1b5c32~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)
> 创建一个对象，是原有对象的精确拷贝。若类型是基本数据类型，则拷贝值；若数据类型是引用数据类型，则拷贝地址。原有对象的饮用类型值改变会影响拷贝对象。

**深拷贝**
![深拷贝](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce893a54f6c13d~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)
> 同浅拷贝类似，但对于引用类型是重新开辟个存储空间，而不是直接使用原有对象的引用指针。原有对象的饮用类型值改变不会影响拷贝对象。


*实现深拷贝*
**JSON**
关于深拷贝，我们首先会想到 JSON.parse(JSON.stringify())。在不使用第三方库的基础下，是一个简单粗暴的方法，但他的限制很多：undefined会被忽略、忽略Symbol、RegExp转成空对象、Date会调用toJSON转成string、函数会被忽略等等。

**简易版本**
> 实现基本数据类型、object、array

```ts
  const getType = (target: any): string => {
    return Object.prototype.toString.call(target).slice(8, -1)
  }

  const deepClone = <T = unknown>(target: T): T => {
    const type = getType(target)

    if (type === 'Object' || type === 'Array') {
      const copyTarget = type === 'Array' ? [] : {}

      const keys = Object.keys(target || {})

      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]
        copyTarget[key] = deepClone(target[key])
      }

      return copyTarget as T
    }

    return target
  }
```

基础数据类型直接返回；
引用类型则创建新地址，并递归调用赋值，直到递归结果为基础数据类型（引用类型的嵌套会很深）

让我们来测试下：
```ts
  const data: any = {
    a: "1",
    b: true,
    c: 0,
    d: null,
    e: [
      "1",
      2,
      true,
      {
        value: {
          data: true,
          success: true,
        },
      },
      undefined,
    ],
    f: {
      data: {
        item: {
          test: "123",
        },
      },
    },
  };

  console.log(deepClone(data)) // 结果无误
```

**循环引用问题**
让我们执行下面这个测试用例：

```ts
  let data: any = {
    a: "1",
    b: true,
    c: 0,
    d: null,
    e: [
      "1",
      2,
      true,
      {
        value: {
          data: true,
          success: true,
        },
      },
      undefined,
    ],
    f: {
      data: {
        item: {
          test: "123",
        },
      },
    },
  };

  data.data = data
  console.log(deepClone(data)) // Uncaught RangeError: Maximum call stack size exceeded
```

你会发现浏览器报错了，查看报错信息可知，是堆栈溢出导致的报错，这因为递归进入死循环导致栈内存溢出了。

解决循环引用的问题我们可以新开辟一个内存地址，在复制之前去检测这个对象是否在我们维护的一套数据中。如果有则直接返回，如果没有则记录。

对于这个数据存储，我们可以用 key/value 形式存储，例如 Map。

```ts
  const deepClone = <T = unknown>(target: T, map = new Map()): T => {
    const type = getType(target)

    if (type === 'Object' || type === 'Array') {
      const copyTarget = type === 'Array' ? [] : {}

      // 利用 key/value 数据结构解决 循环引用
      // 如果已经找到了target 对应的拷贝对象， 则直接返回
      if (map.get(target)) {
        return map.get(target)
      }
      // 保存，这里的key是target的指针地址
      map.set(target, copyTarget)

      const keys = Object.keys(target || {})
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]
        copyTarget[key] = deepClone(target[key], map)
      }

      return copyTarget as T
    }

    return target
  }
```


**[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#why_weakmap_%EF%BC%9F)**
为什么要这样做呢？，先来看看WeakMap的作用：
>WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

什么是弱引用呢？
>在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

在很多源码中，经常能看到给一个对象赋值使用后，将其再次赋值为null，这是因为他是一个强引用的对象需手动赋值为null，它才会被垃圾回收机制进行回收；而弱引用对象，垃圾回收机制会自动帮我们回收。

一个Map🌰：
如果我们使用Map的话，那么对象间是存在强引用关系的：
```js
  let data = { value: 'test'}
  const map = new Map();
  map.set(data, true);
  data = null; // 释放
```
虽然 data 已经被释放，但是因为Map的强引用，并不会被释放内存空间

一个WeakMap🌰：
如果我们使用WeakMap的话，那么对象间是存在弱引用关系的：
```js
  let data = { value: 'test'}
  const map = new WeakMap();
  map.set(data, true);
  data = null; // 释放
```
如果是WeakMap的话，map和data存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
