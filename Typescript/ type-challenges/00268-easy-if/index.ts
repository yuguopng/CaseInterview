type If<C extends boolean, T, F> = C extends true ? T : F

type result_if1 = If<true, 'a', 'b'>  // expected to be 'a'
type result_if2 = If<false, 'a', 'b'> // expected to be 'b'
