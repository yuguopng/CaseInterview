type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

// 方案 1 -- any不适配
type Length_01<T extends readonly any[]> = T['length']

// 方案 2
type Length_03<T extends readonly any[]> = T extends { length: infer P } ? P extends number ? P : never : never

type teslaLength = Length_03<tesla>  // expected 4
type spaceXLength = Length_03<spaceX> // expected 5
type anyLength = Length_03<any> // expected never
type tLength = Length_03<[]> // expected never