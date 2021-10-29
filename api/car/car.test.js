const { badCar, Car } = require('./car');

// TDD
// 1. Write simplest test that fails
// 2. Write least amount of code that passes the test.
// 3. Refactor

// ==============================================

describe('badCar', () => {
  // describe (just for organization)
  it('returns a toyota', () => {
    // test

    let actualValue = badCar();
    const expectedValue = { make: 'toyota', model: 'prius' };

    // -Use toBe() for primitive values
    //  (truelly the same object in memory)
    // actualValue = expectedValue;
    // expect(actualValue).toBe(expectedValue); // same thing

    // -Use toEqual() to compare shapes.
    expect(actualValue).toEqual(expectedValue); // same shape
  });
});

// ==============================================

describe('Car class', () => {
  let car;
  // Below are hooks:
  // -beforeAll()
  // -afterAll()
  // -afterEach()
  beforeEach(() => {
    // run this code before each test
    car = new Car('chevy', 'blazer');
  });

  it('exists', () => {
    // TDD
    // 1. Write simplest test that fails
    // 2. Write least amount of code that passes the test.
    // 3. Refactor
    expect(Car).toBeDefined();
  });

  // --------------------------------------------

  it('can build instances of cars', () => {
    // make an instance of a car with our car class
    // const car = new Car();
    // assert that it's an instance of a Car
    expect(car).toBeInstanceOf(Car);
  });

  // --------------------------------------------

  it('can build a car with make and model', () => {
    // build an instance
    // const car = new Car('chevy', 'blazer');

    expect(car).toHaveProperty('make');
    expect(car).toHaveProperty('model');

    expect(car).toHaveProperty('make', 'chevy');
    expect(car).toHaveProperty('model', 'blazer');

    expect(car).toEqual({ make: 'chevy', model: 'blazer', odometer: 0 });

    expect(car.make).toBe('chevy');
    expect(car.model).toBe('blazer');

    // -If car class grows to have more properties,
    //  below will still work.
    expect(car).toMatchObject({ make: 'chevy', model: 'blazer' });
  });

  // --------------------------------------------

  it('new cars have an "odometer" prop initialized at zero', () => {
    // 1. Write simplest test that fails
    // 2. Write least amount of code that passes the test.
    // 3. Refactor
    // const car = new Car();
    expect(car.odometer).toBe(0);
  });

  // --------------------------------------------

  it('cars have a drive method', () => {
    expect(car).toHaveProperty('drive');
    expect(car.drive).toBeInstanceOf(Function);
    expect(car.drive).toBe(Car.prototype.drive);
  });

  // --------------------------------------------

  it('driving a distance adds miles to the odometer', () => {
    // -Try to NOT test things more than once!
    expect(car.odometer).toBe(0); // REDUNDANT

    car.drive(10);
    expect(car.odometer).toBe(10);

    car.drive(5);
    expect(car.odometer).toBe(15);
  });

  // --------------------------------------------

  it('driving returns the updated odometer', () => {
    // NOTE: Due to closers, car.odometer is 0 here!

    // testing the return value fo the method
    expect(car.drive(5)).toBe(5);
    expect(car.drive(5)).toBe(10);
    expect(car.drive(5)).toBe(15);
  });

  // --------------------------------------------

  it('driving ASYNC resolves to the updated odometer', async () => {
    expect(await car.driveAsync(5)).toBe(5);
    expect(await car.driveAsync(5)).toBe(10);
    expect(await car.driveAsync(5)).toBe(15);
  });
});
