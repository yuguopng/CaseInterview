<!--info-header-start-->
<h1>
  Length of Tuple
</h1>
<!--info-header-end-->

For given a tuple, you need create a generic Length, pick the length of the tuple

For example


```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5
type anyLength = Length<any> // expected never
```

