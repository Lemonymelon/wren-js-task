module.exports = {
  setupFilesAfterEnv: ["./test/setup.js"],
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/index.tsx",
    "src/**/*.js",
    "src/**/*.jsx",
    "!src/index.jsx",
    "!dist/index.js",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js", "jsx", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  testMatch: ["**/test/*.test.(ts|js|jsx|tsx)"],
  testEnvironment: "jsdom",
  testURL: "http://localhost/",
};
