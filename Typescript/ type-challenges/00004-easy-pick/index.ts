interface Todo {
  title: string
  description: string
  completed: boolean
}

// 案例1
// 只能继承所有参赛，扩展性低
type MyPick_01<A> = {
  [key in keyof A]: A[key]
}

// 结果为泛型 A 的全部，扩展性低
// {
//   title: string;
//   description: string;
//   completed: boolean;
// }
type TodoPreview_01 = MyPick_01<Todo>

// 案例2 - 案例1的升级
type MyPick_02<A, B extends keyof A> = {
  [key in B]: A[key]
}

// 结果为泛型 A 的部分，扩展性有，但泛型 B 的值必传，无法省略
type TodoPreview_02 = MyPick_02<Todo, 'completed'>


// 案例3 - 案例2的升级
type MyPick_03<A, B extends keyof A = keyof A> = {
  [key in B]: A[key]
}

// 结果为泛型 A 的部分，扩展性高，泛型 B 也可省略
type TodoPreview = MyPick_03<Todo, 'title'>

const todo: TodoPreview = {
  title: 'Clean room',
}