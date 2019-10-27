// @ts-nocheck
const arrayEvery = Array.prototype.every;
const arrayFilter = Array.prototype.filter;
beforeAll(() => {
  Array.prototype.every = undefined;
  Array.prototype.filter = undefined;
});
afterAll(() => {
  Array.prototype.every = arrayEvery;
  Array.prototype.filter = arrayFilter;
});
describe("array tests", () => {
  test("filter should work", () => {
    require("../Array/filter");
    const arr = [1, 2, 3];
    const res = arr.filter((ele, i, arr) => ele === 1);
    expect(res[0]).toBe(1);
  });
  test("every shoud work", () => {
    require("../Array/every");
    const arr = [1, 2, 3];
    expect(
      arr.every(function(ele, i, arr) {
        return ele < 4;
      })
    ).toBe(true);
  });
});
