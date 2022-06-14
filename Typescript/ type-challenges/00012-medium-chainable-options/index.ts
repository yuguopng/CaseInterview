type Chainable<O extends object = {}> = {
  option<K extends string, V>(
    k: K extends keyof O ? never : K,
    v: V
  ): Chainable<O & { [key in K]:V }>
  get(): O
}

declare const config: Chainable

// expect the type of result to be:
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()