interface Todo {
  title: string
  description: string
}

// 案例1
type MyReadonly<A> = {
  readonly [key in keyof A]: A[key]
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

// @ts-ignore
todo.title = "Hello" // Error: cannot reassign a readonly property
// @ts-ignore
todo.description = "barFoo" // Error: cannot reassign a readonly property