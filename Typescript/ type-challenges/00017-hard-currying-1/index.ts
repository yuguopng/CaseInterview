const add = (a: number, b: number) => a + b

type getFnParameters<T> = T extends (...args: infer P) => any ? P : []
type getFnResult<T> = T extends (...args: any[]) => infer P ? P : never

type GetCurrying<T extends any[], U> = 
  T extends [infer P, ...infer Rest] ? 
    (args: P) => GetCurrying<Rest, U> 
    : U

declare function Currying<F>(fn: F): GetCurrying<getFnParameters<F>, getFnResult<F>>;

const curriedAdd = Currying((v) => 'string' + v)
const five = curriedAdd('1')