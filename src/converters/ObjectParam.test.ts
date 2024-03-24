import { ObjectParam } from "./ObjectParam";

type Person = {
  id: number;
  name: string;
};

describe("DateParam", () => {
  const { serialize, deserialize } = ObjectParam<Person>();
  const p: Person = { id: 1, name: "John" };

  describe("serialize", () => {
    test("null", () => {
      expect(serialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(serialize(undefined as unknown as Person)).toBe(null);
    });
    test("string value", () => {
      expect(serialize("invalid" as unknown as Person)).toBe(null);
    });
    test("number value", () => {
      expect(serialize(3.1415 as unknown as Person)).toBe(null);
    });
    test("Object", () => {
      const expected = encodeURIComponent(JSON.stringify(p));
      expect(serialize(p)).toBe(expected);
    });
  });
  describe("deserialize", () => {
    test("null", () => {
      expect(deserialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as string)).toBe(null);
    });
    test("invalid value", () => {
      expect(deserialize("invalid")).toBe(null);
    });
    test("valid value", () => {
      const serializedValue = "%7B%22id%22%3A1%2C%22name%22%3A%22John%22%7D";
      const deserialized = deserialize(serializedValue);
      expect(deserialized).toEqual(p);
    });
    test("idempotency", () => {
      expect(deserialize(serialize(p))).toEqual(p);
    });
  });
});
