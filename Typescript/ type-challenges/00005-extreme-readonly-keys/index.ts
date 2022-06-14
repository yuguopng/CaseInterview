interface Todo {
  readonly title: string
  description: string
  completed: boolean
}

// 方案 1
type GetReadonlyKeys_01<T> = keyof {
  [
    K in keyof T as
    (<U>() => U extends { [K1 in K]: T[K1] } ? 1 : 2) extends
    (<U>() => U extends { readonly [K1 in K]: T[K1] } ? 1 : 2)
      ? K : never
  ]: 1
}

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

// 方案 2
type GetReadonlyKeys_02<T> = keyof {
  [
    K in keyof T as
    Equal<
      // { [K1 in K]: T[K1] } 代表 T 的每一个属性
      { [K1 in K]: T[K1] },
      // { readonly [K1 in K]: T[K1] } 代表 这一属性 是否只读
      { readonly [K1 in K]: T[K1] }
    > extends true
      ? K : never
  ]: 1
}

// 方案 3
type GetReadonlyKeys_03<T> = keyof {
  [
    K in keyof T as
    Equal<
      Pick<T, K>,
      Readonly<Pick<T, K>>
    > extends true
      ? K : never
  ]: 1
}

type Keys = GetReadonlyKeys_03<Todo> // expected to be "title" | "description"