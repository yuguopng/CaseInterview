<!--info-header-start-->
<h1>
  数据类型
</h1>
<!--info-header-end-->

>questions: JavaScript有哪些数据类型，它们的区别？

**基本数据类型：**
Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

**引用数据类型：**
Function、Object、Array

**基本数据类型和引用数据类型的区别**
- 数据存储方式不同
  - 基本数据类型：存储在栈(stack)中的简单数据字段，占据空间小，属于被频繁使用数据，方便数据检索，故放入栈中存储。
  - 引用数据类型：存储在堆(heap)中，占据空间不确定，数据长度不固定。如果存储在栈(stack)中，会影响程序运行的性能。所以在栈(stack)中存储引用数据的地址，在堆(heap)中存储引用数据的值。
- 数据访问方式不同
  - 基本数据类型：直接访问栈(stack)中的数据
  - 引用数据类型：当程序运行时会先去栈(stack)中找数据地址，然后再去堆(heap)中查找数据值
- 数据复制方式不同
  - 基本数据类型：直接复制数据值
    ```js
    let a = 10
    let b = a // 将 a 的数据值给 b，a 和 b 虽然值相同，但是数据地址不同

    b = 20
    a === b // false
    ```
  - 引用数据类型：复制数据引用地址
    ```js
    let a = {}
    let b = a // 将 a 的数据引用地址给 b，a 和 b 指向同一数据地址

    a === b // true

    b.name = 'test' // 修改了 b，a 也发生改变
    a.name // test
    ```

