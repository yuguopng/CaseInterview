// [[Resolve]](promise2, x)
/**
 * promise 解析函数 
 * @param promise 下一个 Promise（当前 then 返回的 新Promise）
 * @param x 当前 Promise resolve ｜ reject 的值
 */
const onResolvePromise = (promise, x, resolve, reject) => {
  // https://promisesaplus.com/#point-48
  if (promise === x) {
    throw new TypeError('promise and x refer to the same object')
  }

  if (x instanceof MyPromise) {
    // https://promisesaplus.com/#point-49
    x.then(v => {
      onResolvePromise(promise, v, resolve, reject)
    }, reject)
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // https://promisesaplus.com/#point-53
    let then

    try {
      then = x.then
    } catch (e) {
      // https://promisesaplus.com/#point-55
      reject(e)
    }

    if (typeof then === 'function') {
      // https://promisesaplus.com/#point-59
      let hasCalled = false

      try {
        // https://promisesaplus.com/#point-56
        then.call(
          x,
          (y) => {
            // https://promisesaplus.com/#point-59
            if (hasCalled) return
            hasCalled = true

            // https://promisesaplus.com/#point-57
            onResolvePromise(promise, y, resolve, reject)
          },
          (e) => {
            // https://promisesaplus.com/#point-59
            if (hasCalled) return
            hasCalled = true

            // https://promisesaplus.com/#point-58
            reject(e)
          }
        )
      } catch (e) {
        // https://promisesaplus.com/#point-60

        // https://promisesaplus.com/#point-61
        if (hasCalled) return
        hasCalled = true

        // https://promisesaplus.com/#point-62
        reject(e)
      }
    } else {
      // https://promisesaplus.com/#point-63
      resolve(x)
    }
  } else {
    // https://promisesaplus.com/#point-64
    resolve(x)
  }
}

class MyPromise<T = unknown> {
  static PENDING: "pending" = "pending";
  static FULFILLED: "fulfilled" = "fulfilled";
  static REJECTED: "rejected" = "rejected";

  // point 5⃣️ / point 1⃣️
  // https://promisesaplus.com/#promise-states
  // 包含3种 pending、fulfilled、rejected
  // 状态一经变更后不可再次变更(只能从 pending -> fulfilled 或 pending -> rejected)
  PromiseState: "pending" | "fulfilled" | "rejected"
    // 初始状态是 pending 
    = MyPromise.PENDING;
  // point 5⃣️
  PromiseResult: T;

  private PromiseFulfilledStateCallback: Function[] = []
  private PromiseRejectedStateCallback: Function[] = []

  constructor(
    cb: (resolve: MyPromise<T>["resolve"], reject: MyPromise<T>["rejected"]) => void
  ) {
    // point 4⃣️ 
    // cb必传
    if (!cb) {
      throw new Error("Promise resolver undefined is not a function");
    }

    this.PromiseResult = null as unknown as T;

    // point 6⃣️
    // 如果 cb 执行错误，则直接走 reject
    try {
      // this.resolve | this.reject, this 指向问题
      cb(this.resolve, this.rejected);
    } catch (e) {
      this.rejected(e)
    }
  }

  // 使用 箭头函数 避免this指向问题
  resolve = (result: T) => {
    // https://promisesaplus.com/#point-14
    // 只有状态为 pending 才可以转变为 fulfilled, 一经变更后不可再次变更
    if (this.PromiseState !== MyPromise.PENDING) {
      return;
    }

    this.PromiseState = MyPromise.FULFILLED;
    this.PromiseResult = result;
    // point 1⃣️1⃣️
    // 当状态改变 依次调用
    this.PromiseFulfilledStateCallback.forEach(callback => {
      callback(result)
    })
  };

  // 使用 箭头函数 避免this指向问题
  rejected = (reason?: any) => {
    // https://promisesaplus.com/#point-17
    // 只有状态为 pending 才可以转变为 rejected, 一经变更后不可再次变更
    if (this.PromiseState !== MyPromise.PENDING) {
      return;
    }

    this.PromiseState = MyPromise.REJECTED;
    this.PromiseResult = reason;
    // point 1⃣️1⃣️
    // 当状态改变 依次调用
    this.PromiseRejectedStateCallback.forEach(callback => {
      callback(reason)
    })
  };

  /**
   * then 函数中 关于 resolve 的处理
   * https://promisesaplus.com/#point-41
   * https://promisesaplus.com/#point-42
   * https://promisesaplus.com/#point-43
   * @param PromiseResult 
   * @param onFulfilled 
   * @param promise2 
   * @param resolve 
   * @param reject 
   */
  private onThenResolve = <T = unknown>(
    PromiseResult: T,
    onFulfilled,
    promise2,
    resolve,
    reject
  ) => {
    // point 1⃣️0⃣️
    // https://promisesaplus.com/#point-34
    // 在下一事件循环中执行
    try {
      // point 7⃣️
      // https://promisesaplus.com/#point-43
      if (typeof onFulfilled !== 'function') {
        resolve(PromiseResult)
      } else {
        const x = onFulfilled(PromiseResult)
        onResolvePromise(promise2, x, resolve, reject)
      }
    } catch (e) {
      reject(e)
    }
  }

  /**
   * * then 函数中 关于 rejected 的处理
   * https://promisesaplus.com/#point-41
   * https://promisesaplus.com/#point-42
   * https://promisesaplus.com/#point-44
   * @param PromiseResult 
   * @param onRejected 
   * @param promise2 
   * @param resolve 
   * @param reject 
   */
  private onThenRejected = (
    PromiseResult,
    onRejected,
    promise2,
    resolve,
    reject
  ) => {
    // point 1⃣️0⃣️
    // https://promisesaplus.com/#point-34
    // 在下一事件循环中执行
    try {
      // point 7⃣️
      // https://promisesaplus.com/#point-44
      if (typeof onRejected !== 'function') {
        reject(PromiseResult)
      } else {
        const x = onRejected(PromiseResult)
        onResolvePromise(promise2, x, resolve, reject)
      }
    } catch (e) {
      reject(e)
    }
  }

  // https://promisesaplus.com/#point-23
  then(
    onFulfilled?: (data: T) => any,
    onRejected?: (data: any) => any,
  ) {
    // point 1⃣️2⃣️
    // https://promisesaplus.com/#point-40
    const promise2 = new MyPromise<T>((resolve, reject) => {
      // point 1⃣️1⃣️
      // 若 promise 还是 pending 则安顺序存储回掉
      if (this.PromiseState === MyPromise.PENDING) {
        this.PromiseFulfilledStateCallback.push((value: T) => {
          setTimeout(() => {
            this.onThenResolve<T>(value, onFulfilled, promise2, resolve, reject)
          })
        })
        this.PromiseRejectedStateCallback.push((value: T) => {
          setTimeout(() => {
            this.onThenRejected(value, onRejected, promise2, resolve, reject)
          })
        })
      }
  
      // point 3⃣️ / point 5⃣️ / point 8⃣️
      // https://promisesaplus.com/#point-26
      if (this.PromiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.onThenResolve<T>(this.PromiseResult, onFulfilled, promise2, resolve, reject)
        })
      }
  
      // point 3⃣️ / point 5⃣️ / point 9⃣️
      // https://promisesaplus.com/#point-30
      if (this.PromiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          this.onThenRejected(this.PromiseResult, onRejected, promise2, resolve, reject)
        })
      }
    })

    // point 1⃣️2⃣️
    // https://promisesaplus.com/#point-40
    return promise2
  }

  catch = (onRejected: any) => {
    return this.then(undefined, onRejected)
  }

  static resolve = (value) => {
    const p = new MyPromise((r, j) => {
      onResolvePromise(p, value, r, j)
    })

    return p
  }

  static reject = (reason) => {
    return new MyPromise((r, j) => {
      j(reason)
    })
  }
}


// promises-aplus-tests 测试
// // @ts-ignore
// MyPromise.deferred = function () {
//   let result: any = {};
//   result.promise = new MyPromise((resolve, reject) => {
//       result.resolve = resolve;
//       result.reject = reject;
//   });
//   return result;
// }

// // @ts-ignore
// module.exports = MyPromise;
