import { ParamSerializationConfig } from ".";

export function ObjectParam<TObject>() {
  return {
    serialize: (value: TObject) => encodeURIComponent(JSON.stringify(value)),
    deserialize: (value: string) => {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return null;
      }
    },
  } as ParamSerializationConfig<TObject>;
}
