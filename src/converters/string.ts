import { ParamSerializationConfigBuilder } from ".";

export const stringParam: ParamSerializationConfigBuilder<
  string | undefined
> = () => ({
  serialize: (value) => value ?? null,
  deserialize: (value) => (value ? `${value}` : undefined),
});
