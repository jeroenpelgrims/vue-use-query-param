import { LocationQueryValue } from "vue-router";
import { ParamSerializationConfig } from ".";

// Slightly iffy typing with the `as` casts, but yolo.

export function arrayParam<TParam>(
  elementConfig: ParamSerializationConfig<TParam>
): ParamSerializationConfig<NonNullable<TParam>[] | undefined> {
  return {
    serialize: (values) => {
      if (!values) {
        return null;
      }
      return values.map(elementConfig.serialize) as LocationQueryValue[];
    },
    deserialize: (values) => {
      if (values === null || values === undefined) {
        return undefined;
      }

      if (!Array.isArray(values)) {
        return [elementConfig.deserialize(values)] as NonNullable<TParam>[];
      }

      return values.map(elementConfig.deserialize) as NonNullable<TParam>[];
    },
  };
}
