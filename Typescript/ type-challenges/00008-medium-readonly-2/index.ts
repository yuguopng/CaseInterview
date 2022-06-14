interface Todo {
  title: string
  description: string
  completed: boolean
}

// 方案 1
type MyReadonly2_01<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}

// 方案 2
type MyReadonly2_02<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & Pick<T, Exclude<keyof T, K>>

// 方案 3
type MyReadonly2_03<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

// 方案 4
type MyReadonly2_04<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

const todo: MyReadonly2_04<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK