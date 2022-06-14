// 案例 1
type Includes_01<T extends any[], P> = P extends T[number] ? true : false

export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

// 案例 2
type Includes_02<T extends any[], P> = T extends [infer X, ...infer rest] ?
  Equals<X, P> extends true ? true : Includes_02<rest, P>  : false

type isPillarMen1 = Includes_02<
  ['Kars', 'Esidisi', 'Wamuu', 'Santana'],
  'Esidisi'
>

type isPillarMen2 = Includes_02<
  [boolean],
  false
>