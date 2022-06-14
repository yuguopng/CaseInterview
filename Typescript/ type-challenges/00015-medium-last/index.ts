type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type Last_01<T extends any[]> = T extends [infer X, ...infer Rest]
  ? Rest extends [] ? X : Last_01<Rest>
  : never

type Last_02<T extends any[]> = T extends [...infer X, infer last]
  ? last : never

type Last_03<T extends any[]> = [null, ...T][T['length']]

type tail1 = Last_03<arr1> // expected to be 'c'
type tail2 = Last_03<arr2> // expected to be 1