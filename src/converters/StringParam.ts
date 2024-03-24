import { ParamSerializationConfig } from ".";

export const StringParam: ParamSerializationConfig<string | null> = {
  serialize: (value) => value,
  deserialize: (value) => (value ? `${value}` : null),
};
