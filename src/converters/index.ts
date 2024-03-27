import { LocationQueryValue } from "vue-router";
export * from "./array";
export * from "./boolean";
export * from "./date";
export * from "./number";
export * from "./object";
export * from "./string";

// export type QueryParamDefinition<TParam> = {
//   name: string;
// } & ParamSerializationConfig<TParam>;

export type ParamSerializationConfig<TParam> = {
  serialize: (
    value: TParam | undefined
  ) => LocationQueryValue | LocationQueryValue[];
  deserialize: (value: LocationQueryValue | LocationQueryValue[]) => TParam;
};

export type ParamSerializationConfigBuilder<TParam, TOptions = {}> = (
  options?: TOptions
) => ParamSerializationConfig<TParam>;
