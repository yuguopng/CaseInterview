<!--info-header-start-->
<h1>
  First of Array
</h1>
<!--info-header-end-->

Give an array, transform into an object type and the key/value must in the given array.
Implement a generic First<T> that takes an Array T and returns it's first element's type.

For example

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
type head3 = First<[]> // expected to be never
```

