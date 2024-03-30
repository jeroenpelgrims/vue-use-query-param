import { ParamSerializationConfig } from ".";

export function objectParam<TObject>(): ParamSerializationConfig<
  TObject | undefined
> {
  return {
    serialize: (value) => {
      if (value === undefined || value === null || typeof value !== "object") {
        return null;
      }
      return JSON.stringify(value);
    },
    deserialize: (value) => {
      if (value === null || Array.isArray(value)) {
        return undefined;
      }
      try {
        return JSON.parse(value);
      } catch {
        return undefined;
      }
    },
  };
}
