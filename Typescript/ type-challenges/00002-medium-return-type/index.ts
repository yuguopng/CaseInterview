const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

const fn1 = (v: boolean, a: number) => {
  if (v)
    return fn
  else
    return 2
}

type MyReturnType<T> = T extends (args: any) => infer P ? P : never

type a = MyReturnType<typeof fn> // should be "1 | 2"

type b = MyReturnType<typeof fn1> 