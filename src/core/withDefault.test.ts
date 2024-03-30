import { numberParam } from "../converters";
import { withDefault } from "./withDefault";

describe("withDefault", () => {
  const { serialize, deserialize } = withDefault(numberParam(), 123);

  test("returns deserialized value when deserializer returns correct value", () => {  
    expect(deserialize('2')).toBe(2);
    expect(deserialize('100')).toBe(100);
    expect(deserialize('-2')).toBe(-2);
    expect(deserialize('-3.1415')).toBe(-3.1415);
  });

  test("returns default value when deserializer returns null", () => {
    expect(deserialize(null)).toBe(123);
  });

  test("returns default value when deserializer returns undefined", () => {
    expect(deserialize(undefined as unknown as null)).toBe(123);
  });
});
