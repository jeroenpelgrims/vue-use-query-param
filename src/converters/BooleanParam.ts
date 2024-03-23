import { ParamSerializationConfig } from ".";

export const BooleanParam: ParamSerializationConfig<boolean | null> = {
  serialize: (value) => (typeof value === "boolean" ? value.toString() : null),
  deserialize: (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return null;
  },
};
