import { ParamSerializationConfig } from ".";

export const NumberParam: ParamSerializationConfig<number | null> = {
  serialize: (value) => (Number.isFinite(value) ? `${value}` : null),
  deserialize: (value) => {
    try {
      const parsedValue = Number.parseFloat(value as string);
      return Number.isFinite(parsedValue) ? parsedValue : null;
    } catch {
      return null;
    }
  },
};
