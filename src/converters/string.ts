import { ParamSerializationConfigBuilder } from ".";

export const stringParam: ParamSerializationConfigBuilder<
  string | null
> = () => ({
  serialize: (value) => value,
  deserialize: (value) => (value ? `${value}` : null),
});
