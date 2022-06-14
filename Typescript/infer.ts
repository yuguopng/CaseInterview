// inter 使用条件
// 1. 只能出现在有条件类型的 extends 子语句中；
// 2. 出现 infer 声明，会引入一个待推断的类型变量；
// 3. 推断的类型变量可以在有条件类型的 true 分支中被引用；
// 4. 允许出现多个同类型变量的 infer

//--------------------------------------------------------------------------
// typescript 内置函数 Parameters 模拟
// 获取函数入参数据类型
type getFnParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

function fn1(name: string, age: number) {
  return {
    name,
    age
  }
}

type fn1Parameters = Parameters<typeof fn1>

//--------------------------------------------------------------------------
// typescript 内置函数 ReturnType 模拟
// 获取函数返回数据类型
type getFnReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer P ? P : any

function fn2(name: string, age: number) {
  return {
    name,
    age
  }
}

type fn2ReturnValue = getFnReturnType<typeof fn2>

//--------------------------------------------------------------------------
// typescript 内置函数 InstanceType 模拟
// 获取实例数据类型
type getInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer P ? P : any

class Person1 {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

type person1 = getInstanceType<typeof Person1>

//--------------------------------------------------------------------------
// typescript 内置函数 ConstructorParameters 模拟
// 获取类构造函数所需数据类型
type getConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never

class Person2 {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

type person2 = getConstructorParameters<typeof Person1>

//--------------------------------------------------------------------------
// typescript 内置函数 ThisParameterType 模拟
// 获取函数首个参数数据类型
type getThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;

function getNumber(this: Math) {
  return this.ceil(this.random() * 10)
}

function myNumber<T extends (...args: any) => any>(that: getThisParameterType<T>): ReturnType<T> {
  return getNumber.apply(that)
}

const result1 = myNumber<typeof getNumber>(Math)

// 改进版本 V2
type getThisParameterTypeV2<T extends (this: any, ...args: any[]) => any> = T extends (this: infer U, ...args: infer V) => any ? [U, ...V] : unknown;

function getNumberV2(this: Math, radix: number) {
  return this.ceil(this.random() * radix)
}

function myNumberV2(...args: getThisParameterTypeV2<typeof getNumberV2>): ReturnType<typeof getNumberV2> {
  const [that, ...values] = args;
  return getNumberV2.apply(that, ...values)
}

const result2 = myNumberV2(Math, 20)

//--------------------------------------------------------------------------
// typescript 内置函数 OmitThisParameter 模拟
type getOmitThisParameter<T> = unknown extends getThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;

function add(a: number, b: string) {
  return a + Number(b)
}
