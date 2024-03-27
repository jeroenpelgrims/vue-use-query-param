import { booleanParam } from "./boolean";

describe("booleanParam", () => {
  const { serialize, deserialize } = booleanParam();

  describe("serialize", () => {
    test("true", () => {
      expect(serialize(true)).toBe("true");
    });
    test("false", () => {
      expect(serialize(false)).toBe("false");
    });
    test("null", () => {
      expect(serialize(null)).toBe(null);
    });
    test("undefined", () => {
      const result = serialize(undefined as unknown as boolean);
      expect(result).toBe(null);
    });
    test("String value", () => {
      const result = serialize("true" as unknown as boolean);
      expect(result).toBe(null);
    });
  });
  describe("deserialize", () => {
    test("true", () => {
      expect(deserialize("true")).toBe(true);
    });
    test("false", () => {
      expect(deserialize("false")).toBe(false);
    });
    test("String value", () => {
      expect(deserialize("foo")).toBe(null);
    });
    test("Number value", () => {
      expect(deserialize(123 as unknown as string)).toBe(null);
    });
    test("null", () => {
      expect(deserialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as string)).toBe(null);
    });
  });
});
