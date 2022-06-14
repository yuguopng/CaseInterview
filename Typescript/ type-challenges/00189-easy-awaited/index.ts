
type MyPromise<T extends Promise<any>> = T extends Promise<infer U> ? U extends Promise<unknown> ? MyPromise<U> : U : never