module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest", // Use Babel to transform JS/JSX files
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"], // Add testing-library matchers
  };
  