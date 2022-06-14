type Concat<T extends any[], U extends any[]> = [...T, ...U]

type Concat_02<T extends any[], U extends any[]> = [
  ...T extends any[] ? T : [T],
  ...U extends any[] ? U : [U]
]

type Result = Concat<[1], [2]> // expected to be [1, 2]