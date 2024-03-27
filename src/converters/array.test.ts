import { arrayParam } from "./array";
import { numberParam } from "./number";

describe("arrayParam", () => {
  const { serialize, deserialize } = arrayParam(numberParam());

  describe("serialize", () => {
    test("null", () => {
      expect(serialize(null)).toEqual(null);
    });
    test("undefined", () => {
      expect(serialize(undefined as unknown as null)).toEqual(null);
    });
    test("empty array", () => {
      expect(serialize([])).toEqual([]);
    });
    test("array with single item", () => {
      expect(serialize([123])).toEqual(["123"]);
    });
    test("array with multiple items", () => {
      expect(serialize([123, 456, 789])).toEqual(["123", "456", "789"]);
    });
  });
  describe("deserialize", () => {
    test("null", () => {
      expect(deserialize(null)).toEqual(null);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as null)).toEqual(null);
    });
    test("empty array", () => {
      expect(deserialize([])).toEqual([]);
    });
    test("array with single item", () => {
      expect(deserialize(["123"])).toEqual([123]);
    });
    test("array with multiple items", () => {
      expect(deserialize(["123", "456", "789"])).toEqual([123, 456, 789]);
    });
  });
});