<!--info-header-start-->
<h1>
  Currying 
</h1>
<!--info-header-end-->

TypeScript 4.0 is recommended in this challenge

Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

For example:

```ts
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```

The function passed to Currying may have multiple arguments, you need to correctly type it.

In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.


