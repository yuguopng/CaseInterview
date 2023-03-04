<!--info-header-start-->
<h1>
  Promise
</h1>
<!--info-header-end-->

> Q：如何实现promise polyfill

<h3>Promise 的状态</h3>

1⃣️: Promise 包含3种 pending | fulfilled | rejected

2⃣️: 初始状态是 pending

3⃣️: 只能从 pending -> fulfilled 或 pending -> rejected

4⃣️: Promise 必须传递一个 callback

5⃣️: Promise 存在2个属性：PromiseState、PromiseResult；PromiseState 为 fulfilled 时，PromiseResult 是 promise 的结果；PromiseState 为 rejected 时，PromiseResult 是 rejected 的y原因；

6⃣️: Promise 在执行 callback 时，若 callback 抛出异常则会进入 rejected 状态

7⃣️: then 方法中，若 onFulfilled 或者 onRejected 不是方法，则忽略并缺使用默认函数替代

8⃣️: then 方法中，onFulfilled 有且只能调用一次；onFulfilled 必须在 Promise 状态变更为 fulfilled 后调用；onFulfilled 必须接受 Promise 的 ”结果“ PromiseResult 作为函数入参数

9⃣️: then 方法中，onRejected 有且只能调用一次；onRejected 必须在 Promise 状态变更为 rejected 后调用；onRejected 必须接受 Promise 的 “错误原因“ PromiseResult 作为函数入参数

1⃣️0⃣️: Promise 必须中 then 方法必须在“下一事件循环”执行，可以是宏任务（macro-task），也可以是微任务（micro-task）。

1⃣️1⃣️: Promise 状态为 pending 时，then 方法的回掉函数会被推入堆栈中，直到 Promise 状态发生改变后依次调用堆栈

1⃣️2⃣️: then 每次调用都会返回一个新的 Promise 

1⃣️3⃣️: Promise 中包好一个 [[Resolve]](promise2, x) 处理函数，专门用于 then 方法返回的新promise 和 当前promise结果的场景处理




