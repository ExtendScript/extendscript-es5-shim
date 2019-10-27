module.exports = {
  testEnvironment: "jest-environment-node",
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: [
    "Array/**/*.{js}",
    "Date/**/*.{js}",
    "Object/**/*.{js}"
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  }
};
