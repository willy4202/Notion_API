class CoffeeMachine {
  constructor(machineBrand, numberOfCoffee, waterCapacity) {
    this.machineBrand = machineBrand;
    this.numberOfCoffee = numberOfCoffee;
    this.waterCapacity = waterCapacity;
  }
  get waterCapacity() {
    return this._waterCapacity;
  }

  set waterCapacity(value) {
    this._waterCapacity = value < 0 ? 0 : value;
  }
}

const illy = new CoffeeMachine('illy', 5, -1);

console.log(illy.waterCapacity);
