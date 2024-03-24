import { ParamSerializationConfig } from "../converters";

export function withDefault<TParam>(
  { serialize, deserialize }: ParamSerializationConfig<TParam>,
  defaultValue: NonNullable<TParam>
): ParamSerializationConfig<NonNullable<TParam>> {
  return {
    serialize,
    deserialize: (value) => deserialize(value) ?? defaultValue,
  };
}
