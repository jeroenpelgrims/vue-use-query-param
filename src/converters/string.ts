import { ParamSerializationConfigBuilder } from ".";

export const stringParam: ParamSerializationConfigBuilder<
  string | undefined
> = () => ({
  serialize: (value) => value ?? null,
  deserialize: (value) => value !== null && value !== undefined
    ? `${value}`
    : undefined
});
