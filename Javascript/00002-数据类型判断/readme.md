<!--info-header-start-->
<h1>
  数据类型判断
</h1>
<!--info-header-end-->

>JavaScript有哪些数据类型检测的方式？

**基本方式：**
typeof、instanceof、constructor、Object.prototype.toString.call

**typeof：**
适用于基本数据类型，对于Array、Object、null判断不精确

```js
  typeof 0             // number
  typeof true          // boolean
  typeof ''            // string
  typeof Symbol()      // symbol
  typeof 10n           // bigint
  typeof function(){}  // function
  typeof undefined     // undefined
  typeof []            // object
  typeof {}            // object
  typeof null          // object
```
**为什么typeof null === ‘object’?**
  >在javascript中，数据类型都是使用二进制表示的，而javascript会把二进制前三位都为0的数据判断为object类型，而null的二进制表示全都是0，自然前三位也是0，所以执行typeof时会返回 “object”。
  [原文](https://2ality.com/2013/10/typeof-null.html)
  
  在初始版本的javascript中，数值是以32字节存储的，其中包含3位的数据类型表示：
  - 000: 表示对象
  - 1:   表示有正负的整数
  - 010: 表示浮点数
  - 100: 表示字符串
  - 110: 表示boolean

  另外包含2个特殊的字符串
  - null(JSVAL_NULL)
  - undefined(JSVAL_IS_VOID)

  **源码实现**
  ```js
  JS_TypeOfValue(JSContext *cx, jsval v)
  {
    JSType type = JSTYPE_VOID;
    JSObject *obj;
    JSObjectOps *ops;
    JSClass *clasp;

    CHECK_REQUEST(cx);
    if (JSVAL_IS_VOID(v)) {  // 判断是否是undefined类型
      type = JSTYPE_VOID;
    } else if (JSVAL_IS_OBJECT(v)) {  // 判断是否是object类型,因为null的表示是000，所以也会进入
      obj = JSVAL_TO_OBJECT(v);
      if (obj && (ops = obj->map->ops,
        ops == & js_ObjectOps
        ? (clasp = OBJ_GET_CLASS(cx, obj),
        clasp->call || clasp == & js_FunctionClass) // (3,4)
        : ops->call != 0)
      ) {  // 判断是否是function
        type = JSTYPE_FUNCTION;
      } else { // 不是function就判定为object，所以null为object
        type = JSTYPE_OBJECT;
      }
    } else if (JSVAL_IS_NUMBER(v)) { // number
      type = JSTYPE_NUMBER;
    } else if (JSVAL_IS_STRING(v)) { // string
      type = JSTYPE_STRING;
    } else if (JSVAL_IS_BOOLEAN(v)) { // boolean
      type = JSTYPE_BOOLEAN;
    }
    return type; // 默认类型 undefined
  }
  ```
  

---
**instanceof**
适用于判断某个对象是否时指定对象的实例，针对引用类型的判断
```js
  // instanceof 不能判断基本数据类型（不通过new操作符构建的基本数据类型）
  0 instanceof Number                       // false
  '' instanceof String                      // false
  true instanceof Boolean                   // false

  // 通过new操作符创建的类型可以使用instanceof判断
  (new Number()) instanceof Number          // true
  new String() instanceof String            // true
  new Boolean(true) instanceof Boolean      // true
  (function(){}) instanceof Function        // true
  null instanceof Object                    // false

  // 数组的原型链既有 Object 也有 Array
  [] instanceof Object                      // true
  [] instanceof Array                       // true

  ({}) instanceof Object                    // true 
```
![原型链](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/24/1691fc878b9beefa~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
---

**constructor**
constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constructor 对象访问它的构造函数

```js
  (2).constructor === Number                     // true
  (true).constructor === Boolean                 // true
  ('str').constructor === String                 // true
  (Symbol('test')).constructor === Symbol        // true
  (10n).constructor == BigInt                    // true
  (function() {}).constructor === Function       // true
  ([]).constructor === Array                     // true
  ({}).constructor === Object                    // true
```
---

**Object.prototype.toString.call**
Object.prototype.toString.call() 使用 Object 对象的原型方法 toString来判断数据类型

*可以精确的判断所有数据类型*
```js
  Object.prototype.toString.call(2)                // [object Number]
  Object.prototype.toString.call('')               // [object String]
  Object.prototype.toString.call(false)            // [object Boolean]
  Object.prototype.toString.call(Symbol('test'))   // [object Symbol]
  Object.prototype.toString.call(10n)              // [object BigInt]
  Object.prototype.toString.call(function(){})     // [object Function]
  Object.prototype.toString.call(undefined)        // [object Undefined]
  Object.prototype.toString.call([])               // [object Array]
  Object.prototype.toString.call({})               // [object Object]
  Object.prototype.toString.call(null)             // [object Null]
```

通用方法
```js
  function jsType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }

  jsType(0)         // Number
  jsType(undefined) // Undefined
```