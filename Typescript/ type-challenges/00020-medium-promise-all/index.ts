const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = Promise.all([promise1, promise2, promise3] as const)

type Value<T = any[]> =
  T extends [infer Tg, ...infer Rest] ?
    [
      Tg extends Promise<infer PV> ?
        PV
        : Tg, ...(Rest extends any[] ? Value<Rest> : [])
    ]
    : [];
