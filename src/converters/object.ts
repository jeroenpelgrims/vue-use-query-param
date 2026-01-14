import { ParamSerializationConfig } from ".";

type ObjectParamOptions = {
  encoding?: "base64" | "json";
};

export function objectParam<TObject>(
  options?: ObjectParamOptions
): ParamSerializationConfig<TObject | undefined> {
  return {
    serialize: (value) => {
      if (value === undefined || value === null || typeof value !== "object") {
        return null;
      }

      const json = JSON.stringify(value);
      switch (options?.encoding) {
        case "base64":
          const bytes = new TextEncoder().encode(json);
          const base64 = btoa(String.fromCharCode(...bytes));
          return base64;
        case undefined:
        case "json":
          return json;
      }
    },
    deserialize: (value) => {
      if (value === null || Array.isArray(value)) {
        return undefined;
      }
      let json = undefined;
      try {
        switch (options?.encoding) {
          case "base64":
            const bytes = Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
            const json = new TextDecoder().decode(bytes);
            return JSON.parse(json);
          case undefined:
          case "json":
            return JSON.parse(value);
        }
      } catch {
        return undefined;
      }
    },
  };
}
