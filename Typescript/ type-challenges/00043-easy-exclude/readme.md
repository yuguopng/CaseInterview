<!--info-header-start-->
<h1>
  Exclude
</h1>
<!--info-header-end-->

Implement the built-in Exclude<T, U>
Exclude from T those types that are assignable to U

```ts
type A = 'a' | 'b' | 'c'
type B = 'b' | 'c' | 'd'

type result1 = MyExclude<A, B> // a
type result2 = MyExclude<B, A> // d
```

