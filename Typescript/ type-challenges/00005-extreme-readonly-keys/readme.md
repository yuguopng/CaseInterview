<!--info-header-start-->
<h1>
  Get Readonly Keys
</h1>
<!--info-header-end-->

Implement a generic GetReadonlyKeys<T> that returns a union of the readonly keys of an Object.

For example

```ts
interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
```

思路
1⃣️：遍历 Todo对象 每一项记为 A[] 
2⃣️：遍历 & 创建 Todo对象 每一只读项记为 B[]
3⃣️：A[number] 和 B[number] 对比, 相等则是 readonly 属性

