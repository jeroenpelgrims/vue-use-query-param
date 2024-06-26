import { ParamSerializationConfigBuilder } from ".";

export const booleanParam: ParamSerializationConfigBuilder<
  boolean | undefined
> = () => ({
  serialize: (value) => (typeof value === "boolean" ? value.toString() : null),
  deserialize: (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
  },
});
