import { BooleanParam } from "./BooleanParam";

describe("BooleanParam", () => {
  describe("serialize", () => {
    test("true", () => {
      expect(BooleanParam.serialize(true)).toBe("true");
    });
    test("false", () => {
      expect(BooleanParam.serialize(false)).toBe("false");
    });
    test("null", () => {
      expect(BooleanParam.serialize(null)).toBe(null);
    });
    test("undefined", () => {
      const result = BooleanParam.serialize(undefined as unknown as boolean);
      expect(result).toBe(null);
    });
    test("String value", () => {
      const result = BooleanParam.serialize("true" as unknown as boolean);
      expect(result).toBe(null);
    });
  });
  describe("deserialize", () => {
    test("true", () => {
      expect(BooleanParam.deserialize("true")).toBe(true);
    });
    test("false", () => {
      expect(BooleanParam.deserialize("false")).toBe(false);
    });
    test("String value", () => {
      expect(BooleanParam.deserialize("foo")).toBe(null);
    });
    test("Number value", () => {
      expect(BooleanParam.deserialize(123 as unknown as string)).toBe(null);
    });
    test("null", () => {
      expect(BooleanParam.deserialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(BooleanParam.deserialize(undefined as unknown as string)).toBe(
        null
      );
    });
  });
});
