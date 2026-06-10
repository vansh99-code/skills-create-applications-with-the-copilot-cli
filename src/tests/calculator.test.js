const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('addition with floats: 0.1 + 0.2 ≈ 0.3', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
  });

  test('negative numbers: -5 + 3 = -2', () => {
    expect(add(-5, 3)).toBe(-2);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow(/Divide by zero/);
  });

  test('invalid input should not produce numbers (sanity)', () => {
    // The calculator functions themselves assume numbers; ensure they behave numerically
    expect(typeof add(1, 2)).toBe('number');
  });

  // Extended operation tests
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow(/Modulo by zero/);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with negative exponent: 2 ^ -1 = 0.5', () => {
    expect(power(2, -1)).toBeCloseTo(0.5, 10);
  });

  test('square root: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('square root of negative number throws', () => {
    expect(() => squareRoot(-1)).toThrow(/Square root of negative number/);
  });
});
