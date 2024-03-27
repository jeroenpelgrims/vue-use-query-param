import { ParamSerializationConfig } from ".";

export function objectParam<TObject>(): ParamSerializationConfig<
  TObject | undefined
> {
  return {
    serialize: (value) => {
      if (value === undefined || value === null || typeof value !== "object") {
        return null;
      }
      return encodeURIComponent(JSON.stringify(value));
    },
    deserialize: (value) => {
      if (value === null || Array.isArray(value)) {
        return undefined;
      }
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return undefined;
      }
    },
  };
}
