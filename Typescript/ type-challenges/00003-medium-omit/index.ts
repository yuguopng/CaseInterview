interface Todo {
  title: string
  description: string
  completed: boolean
}


type MyExclude<T, U> = T extends U ? never : T

// 新功能 https://github.com/zhongsp/TypeScript/blob/dev/zh/release-notes/typescript-4.1.md
type MyOmit1<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

type MyOmit2<T, P extends keyof T = keyof T> = {
  [K in Exclude<keyof T, P>]: T[K]
}

type MyOmit3<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type TodoPreview01 = MyOmit1<Todo, 'description' | 'title'>

type TodoPreview02 = MyOmit2<Todo, 'description' | 'title'>

type TodoPreview03 = MyOmit3<Todo, 'description' | 'title'>

type x = Capitalize<string>