// @target indesign
// @include ./assertions.js

describe("Testing test functions", function() {
  test("toBe", function() {
    expect(1).toBe(1);
    expect(true).toBe(true);
    expect("foo").toBe("foo");
  });
});
