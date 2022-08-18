module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary", "clover", "cobertura"],
  modulePaths: ["<rootDir>"],
  coveragePathIgnorePatterns: [
      "node_modules",
      "jest-global-mocks",
      ".module.ts",
      ".service.ts",
      ".html",
  ],
};
