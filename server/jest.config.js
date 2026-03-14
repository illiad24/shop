export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/loadEnv.ts"],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
};
