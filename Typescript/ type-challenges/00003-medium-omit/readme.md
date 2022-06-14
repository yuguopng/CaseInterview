<!--info-header-start-->
<h1>
  Omit
</h1>
<!--info-header-end-->

Implement the built-in Omit<T, K> generic without using it.

Constructs a type by picking all properties from T and then removing K

For example

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```
