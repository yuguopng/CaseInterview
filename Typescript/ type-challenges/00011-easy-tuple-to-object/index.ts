const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// 案例 1
type TupleToObject_01<T extends Readonly<any[]>> = {
  [P in T[number]]: P
}

// 案例 2 - 案例 1 升级
type TupleToObject_02<T extends ReadonlyArray<any>> = {
  [P in T[number]]: P
}

type result_01 = TupleToObject_01<typeof tuple>
type result_02 = TupleToObject_02<typeof tuple>
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}‘
