type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
  fn: () => void
  arr: any[]
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type DeepReadonly<X> = {
  readonly [K in keyof X]: X[K] extends Object ? X[K] extends Function ? X[K] : DeepReadonly<X[K]> : X[K]
}

type Todo = DeepReadonly<X> // should be same as `Expected`
