import { numberParam } from "./number";

describe("numberParam", () => {
  const { serialize, deserialize } = numberParam();

  describe("serialize", () => {
    test("null", () => {
      expect(serialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(serialize(undefined as unknown as number)).toBe(null);
    });
    test("integer", () => {
      expect(serialize(123)).toBe("123");
    });
    test("float", () => {
      expect(serialize(3.1415)).toBe("3.1415");
    });
    test("string", () => {
      expect(serialize("3.1415" as unknown as number)).toBe(null);
    });
  });
  describe("deserialize", () => {
    test("null", () => {
      expect(deserialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as string)).toBe(null);
    });
    test("integer", () => {
      expect(deserialize("123")).toBe(123);
    });
    test("float", () => {
      expect(deserialize("3.1415")).toBe(3.1415);
    });
    test("String value", () => {
      expect(deserialize("invalid")).toBe(null);
    });
  });
});
