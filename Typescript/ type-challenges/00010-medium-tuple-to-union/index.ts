type Arr = ['1', '2', '3']

// 方案 1
type TupleToUnion_01<T extends any[]> = T extends [infer P, ...infer Reset] ?
  P | TupleToUnion_01<Reset> : never

// 方案 2
type TupleToUnion_02<T extends any[]> = T[number]

type Test = TupleToUnion_02<Arr> // expected to be '1' | '2' | '3'