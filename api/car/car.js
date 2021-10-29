function badCar() {
  return {
    model: 'prius',
    make: 'toyota',
  };
}

// ==============================================

class Car {
  constructor(make = '', model = '') {
    this.make = make;
    this.model = model;
    this.odometer = 0;
  }

  drive(miles) {
    return (this.odometer += miles);
  }

  async driveAsync(miles) {
    return (this.odometer += miles);
  }
}

// ==============================================

module.exports = {
  badCar,
  Car,
};
