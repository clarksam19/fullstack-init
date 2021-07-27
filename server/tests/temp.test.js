const testHelper = require("../utils/test_helper");

test("dummy returns 1", () => {
  const input = ["foo"];

  const result = testHelper.dummy(input);
  expect(result).toBe(1);
});
