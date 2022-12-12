class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    console.log(`drawing ${this.color} color of`);
  }

  getArea() {
    return this.height * this.width;
  }
}
//상속
class Rectangle extends Shape {}

// 다양성
// getArea를 새롭게 override함
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('im triangle');
  }
  getArea() {
    return (this.height * this.width) / 2;
  }
}

const rectangle = new Rectangle(20, 20, 'red');

const triangle = new Triangle(20, 20, 'red');

triangle.draw();

console.log(rectangle.getArea());
console.log(triangle.getArea());
