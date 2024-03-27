import { DateParamType, dateParam } from "./date";

describe("dateParam", () => {
  const { serialize, deserialize } = dateParam();

  describe("serialize datetime", () => {
    test("null", () => {
      expect(serialize(null)).toBe(null);
    });
    test("new Date()", () => {
      const now = new Date();
      expect(serialize(now)).toBe(now.toISOString());
    });
    test("invalid date", () => {
      expect(serialize(new Date("invalid"))).toBe(null);
    });
    test("undefined", () => {
      expect(serialize(undefined as unknown as Date)).toBe(null);
    });
  });

  describe("serialize date", () => {
    const { serialize } = dateParam({ dateType: DateParamType.Date });

    test("null", () => {
      expect(serialize(null)).toBe(null);
    });
    test("new Date()", () => {
      const now = new Date("2021-02-03T12:34:56.789Z");
      expect(serialize(now)).toBe("2021-02-03");
    });
    test("invalid date", () => {
      expect(serialize(new Date("invalid"))).toBe(null);
    });
    test("undefined", () => {
      expect(serialize(undefined as unknown as Date)).toBe(null);
    });
  });

  describe("deserialize", () => {
    test("null", () => {
      expect(deserialize(null)).toBe(null);
    });
    test("undefined", () => {
      expect(deserialize(undefined as unknown as string)).toBe(null);
    });
    test("valid date", () => {
      const now = new Date();
      expect(deserialize(now.toISOString())).toEqual(now);
    });
    test("invalid date", () => {
      expect(deserialize("invalid")).toBe(null);
    });
  });
});
