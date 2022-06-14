
// keyof（索引查询类型） 类似 Object.keys
enum Sex {
  man = 'man',
  women = 'women',
}

interface Person {
  name: string
  age: number
  sex: Sex
  fn?: (v: number) => number
}

//*索引查询类型----------------------------------------------------------------------
// type test = keyof Person
// const value: test = 'age' || 'age' || 'sex' || 'fn' //...所有Person的key

// type test = keyof string
// const value: test = 'toString' //...所有字符串属性的key

// type test = keyof []
// const value: test = 'concat' || 'push' || 'shift' //...所有数组属性的key
//*索引查询类型----------------------------------------------------------------------

//*索引访问类型----------------------------------------------------------------------
// const value1: Person['name'] = '只要是string' // string
// const value2: []['push'] = () => { return 0 } // (...items: never[]) => number
// const value3: string[]['push'] = (...items: string[]) => { return 0 } // (...items: string[]) => number
// const value4: number[]['push'] = (...items: number[]) => { return 0 } // (...items: string[]) => number
//*索引访问类型----------------------------------------------------------------------

// 整改，可识别获取数据类型
function fn(o, v) {
  return o[v]
}

// interface getValue {
//   <S extends object, T extends keyof S>(o: S, v: T): S[T]
// }
