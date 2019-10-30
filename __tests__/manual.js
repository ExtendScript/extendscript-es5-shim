// @target illustrator
// @include ./assertions.js
// @include ../index.js

describe("Array functions", function() {
  
  // array.every
  test("array every element of [1,2,3] should be smaller then 4", function() {
    const arr = [1, 2, 3];
    expect(
      arr.every(function(ele) {
        return ele < 4;
      })
    ).toBe(true);
  });

  // array.filter
  test("array filter (x<3) of [1, 2, 3, 4] should return [1, 2]", function() {
    const arr = [1, 2, 3, 4];
    expect(
      arr.filter(function(ele) {
        return ele < 3 ? true : false;
      })
    ).toEqualArray([1,2]);
  });

  // array.forEach
  test("array forEach (val + 1) of [1, 2, 3] should return [2, 3, 4]", function() {
    const arr = [1, 2, 3];
    const newArr = [];
    
    arr.forEach(function(ele) {
       newArr.push(ele + 1)
    });

    expect(newArr).toEqualArray([2, 3, 4]);
  });

  // array.indexOf
  test("array indexOf (4) in [1, 2, 3, 4, 5, 6] should return 3", function() {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(arr.indexOf(4)).toBe(3);
  });

  // array.isArray
  test('array isArray on [1,2,3], should return true\n\tarray isArray on 1 should return false', function() {
    const arr = [1,2,3];
    expect(Array.isArray(arr)).toBe(true);
    expect(Array.isArray(1)).toBe(false);
  });

  // array.lastIndexOf
  test('array lastIndexOf(4) on [4, 1, 2, 3, 4] should return 4', function() {
    const arr = [4, 1, 2, 3, 4];
    expect(arr.lastIndexOf(4)).toBe(4);
  });

  // array.map
  test('array map (val * 2) on [4, 1, 2, 3, 4] should return [8, 2, 4, 6, 8]', function() {
    const arr = [4, 1, 2, 3, 4];
    expect(arr.map(function(x) {return x * 2})).toEqualArray([8, 2, 4, 6, 8]);
  });

  // array.reduce
  test('array reduce (sum) on [1, 2, 3, 4, 5] should return 15', function() {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.reduce(function(acc, val) { return acc += val},0)).toBe(15);
  })
});
