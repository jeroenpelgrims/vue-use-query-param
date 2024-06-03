import { LocationQueryValue } from "vue-router";
import { stringParam } from "./string";

describe("stringParam", () => {
  const { serialize, deserialize } = stringParam();

  describe("serialize", () => {
    test("null", () => {
      expect(serialize(null as unknown as undefined)).toBe(null);
    });
    test("undefined", () => {
      expect(serialize(undefined)).toBe(null);
    });
    test("String value", () => {
      expect(serialize("foo")).toBe("foo");
    });
  });
  describe("deserialize", () => {
    test("null", () => {
      expect(deserialize(null)).toBe(undefined);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as null)).toBe(undefined);
    });
    test("String value", () => {
      expect(deserialize("foo")).toBe("foo");
    });
    test("Number value", () => {
      expect(deserialize(123 as unknown as LocationQueryValue)).toBe("123");
    });
    test("Empty string", () => {
      expect(deserialize('')).toBe("");
    });
  });
});
