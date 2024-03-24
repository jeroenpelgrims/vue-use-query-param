import { LocationQueryValue } from "vue-router";
import { ParamSerializationConfig } from ".";

export function ArrayParam<TParam>(
  elementConfig: ParamSerializationConfig<TParam>
) {
  return {
    serialize: (values: TParam[]) => values.map(elementConfig.serialize),
    deserialize: (values: LocationQueryValue | LocationQueryValue[]) => {
      if (!values) {
        return null;
      }

      if (!Array.isArray(values)) {
        return [values];
      }

      return values.map(elementConfig.deserialize);
    },
  } as ParamSerializationConfig<Array<NonNullable<TParam>> | null>;
}
