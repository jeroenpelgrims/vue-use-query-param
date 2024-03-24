import { ParamSerializationConfig } from ".";

export function ObjectParam<
  TObject
>(): ParamSerializationConfig<TObject | null> {
  return {
    serialize: (value) =>
      value === null ? null : encodeURIComponent(JSON.stringify(value)),
    deserialize: (value) => {
      if (value === null || Array.isArray(value)) {
        return null;
      }
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return null;
      }
    },
  };
}
