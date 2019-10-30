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
});
