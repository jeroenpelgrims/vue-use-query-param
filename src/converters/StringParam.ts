import { ParamSerializationConfig } from ".";

export const StringParam: ParamSerializationConfig<string> = {
  serialize: (value) => value,
  deserialize: (value) => value as string | null,
};
