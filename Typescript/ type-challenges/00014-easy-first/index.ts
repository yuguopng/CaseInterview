type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

// 案例 1 ---- 未考虑边界值
type First_01<T extends Array<any>> = T[0]

// 案例 2 ---- 通过判断 范型 T 的长度来进行边界值确认
// extends 即使继承也是匹配
type First_02<T extends Array<any>> = T['length'] extends 0 ? never : T[0]

// 案例 3 ---- 通过判断 范型 T 是否继承 []
type First_03<T extends Array<any>> = T extends [] ? never : T[0]

// 案例 4 ---- infer
type First_04<T extends Array<any>> = T extends [infer P, ...infer other] ? P : never

type head1 = First_04<arr1> // expected to be 'a'
type head2 = First_04<arr2> // expected to be 3
type head3 = First_04<[]> // expected to be never