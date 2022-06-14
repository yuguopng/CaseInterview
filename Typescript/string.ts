
// 字符串模版类型
type Hello<T extends string> = (name: T) => `hello, ${T}`

const hello: Hello<string> = (name) =>  `hello, ${name}`

hello('ygp')

// 字符串模版类型 推断
declare function foo<V extends string>(arg: `*${V}*`): V;
const v1 = foo('*hello*') // hello

class Person {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
      // ...
  }
}