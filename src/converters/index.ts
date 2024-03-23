import { LocationQueryValue } from "vue-router";
export * from "./NumberParam";
export * from "./ObjectParam";
export * from "./StringParam";

// export type QueryParamDefinition<TParam> = {
//   name: string;
// } & ParamSerializationConfig<TParam>;

export type ParamSerializationConfig<TParam> = {
  serialize: (
    value: TParam | null
  ) => LocationQueryValue | LocationQueryValue[];
  deserialize: (
    value: LocationQueryValue | LocationQueryValue[]
  ) => TParam | null;
};