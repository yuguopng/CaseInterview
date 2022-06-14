type Push<T extends any[], P> = [...T, P]

type Result1 = Push<[1, 2], '3'> // [1, 2, '3']
