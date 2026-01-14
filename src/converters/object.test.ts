import { objectParam } from "./object";

type Person = {
  id: number;
  name: string;
};

describe("objectParam", () => {
  const { serialize, deserialize } = objectParam<Person>();
  const p: Person = { id: 1, name: "John" };

  describe("serialize", () => {
    test("null", () => {
      expect(serialize(null as unknown as undefined)).toBe(null);
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
      const expected = JSON.stringify(p);
      expect(serialize(p)).toBe(expected);
    });
    test("Object base64", () => {
      const { serialize } = objectParam<Person>({ encoding: "base64" });
      const expected = btoa(JSON.stringify(p));
      expect(serialize(p)).toBe(expected);
    });
  });
  describe("deserialize", () => {
    test("null", () => {
      expect(deserialize(null)).toBe(undefined);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as string)).toBe(undefined);
    });
    test("invalid value", () => {
      expect(deserialize("invalid")).toBe(undefined);
    });
    test("valid value", () => {
      const serializedValue = '{"id":1,"name":"John"}';
      const deserialized = deserialize(serializedValue);
      expect(deserialized).toEqual(p);
    });
    test("idempotency", () => {
      expect(deserialize(serialize(p))).toEqual(p);

      const base64ObjectParam = objectParam<Person>({ encoding: "base64" });
      const serialized = base64ObjectParam.serialize(p);
      const deserialized = base64ObjectParam.deserialize(serialized as string);
      expect(deserialized).toEqual(p);
    });
  });
});
