class ShapeEs6 {
  static name = 'Shape'

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.calculation()
  }

  calculation() {
    return this.width * this.height
  }
}

function ShapeEs5(width, height) {
  this.width = width;
  this.height = height;
}

ShapeEs5.name = 'Shape'

ShapeEs5.prototype = {
  constructor: ShapeEs5,
  calculation: function () {
    return this.width * this.height
  }
}

class Foo {
  constructor() {
    const that = Object.create(null)
    that.prototype.constructor = Foo
    return that;
  }
}

new Foo() instanceof Foo
// false
