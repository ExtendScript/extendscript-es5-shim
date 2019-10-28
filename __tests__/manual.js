// @target indesign
// @include ./assertions.js
// @include ../index.js

describe("Array functions", function() {
  test("array every element of [1,2,3] should be smaller then 4", function() {
    const arr = [1, 2, 3];
    expect(
      arr.every(function(ele) {
        return ele < 4;
      })
    ).toBe(true);
  });
});
