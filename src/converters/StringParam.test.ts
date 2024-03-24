import { LocationQueryValue } from "vue-router";
import { StringParam } from ".";

describe("StringParam", () => {
  describe("serialize", () => {
    test("null", () => {
      expect(StringParam.serialize(null)).toBe(null);
    });
    test("String value", () => {
      expect(StringParam.serialize("foo")).toBe("foo");
    });
  });
  describe("deserialize", () => {
    test("null", () => {
      expect(StringParam.deserialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(StringParam.deserialize(undefined as unknown as null)).toBe(null);
    });
    test("String value", () => {
      expect(StringParam.deserialize("foo")).toBe("foo");
    });
    test("Number value", () => {
      expect(
        StringParam.deserialize(123 as unknown as LocationQueryValue)
      ).toBe("123");
    });
  });
});
