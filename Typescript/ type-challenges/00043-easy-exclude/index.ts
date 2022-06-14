type A = 'a' | 'b' | 'c'
type B = 'b' | 'c' | 'd'

type MyExclude<T, U> = T extends U ? never : T

type result1 = MyExclude<A, B> // a
type result2 = MyExclude<B, A> // d