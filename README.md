IMPORTANT: This plugin has a peer dependency on `vue-router`.  
It will only work when using `vue-router` in your Vue app.

## Features

- Get & set query parameters from the URL in a typesafe way
- Use query parameters like regular ref's

Don't want to read the rest of the README? Check out the [examples](https://stackblitz.com/~/github.com/jeroenpelgrims/vue-use-query-param-example).

## Installing

### npm

```bash
npm install vue-use-query-param
```

### pnpm

```bash
pnpm add vue-use-query-param
```

### yarn

```bash
yarn add vue-use-query-param
```

## Usage

### Add the plugin to your Vue app

```ts
import { createApp } from "vue";
import { createRouter } from "vue-router";
import useQueryParamPlugin from "vue-use-query-param";

const router = createRouter({ ... });

const app = createApp(App);
app.use(router);
app.use(useQueryParamPlugin, {});
app.mount("#app");

```

### Use the `useQueryParam` composable

```vue
<script setup lang="ts">
import { StringParam, useQueryParam } from "vue-use-query-param";

// foo is a `Ref<string | null>`, use it like any other ref
// When setting foo, the URL will be modified, a query parameter `foo` will
// be added or updated. (or removed if you're setting `foo` to null.)
const foo = useQueryParam("foo", StringParam);

foo.value = "bar";
</script>

<template>
  <!-- Reactively updates -->
  {{ foo }}
</template>
```

### Non-nullable query parameters (default values)

If your query parameter should always have a value, you can set a default value like this:

```ts
import { StringParam, useQueryParam, withDefault } from "vue-use-query-param";
const foo = useQueryParam("foo", withDefault(StringParam, "bar"));
```

### Supported types

Currently only a few basic types are supported.

- `StringParam`: for strings
- `NumberParam`: for numbers (integers and floats)
- `ObjectParam`: custom Objects that will be serialized to JSON and then encoded using `encodeURIComponent`.
- `BooleanParam`: for booleans
- `DateParam`: for dates
- `ArrayParam`: for arrays of the above types  
  NOTE: Nested arrays are currently only possible using `ObjectParam`. e.g.: `ObjectParam<number[][]>()`;

For some examples on how to use these, check out [these examples](https://stackblitz.com/~/github.com/jeroenpelgrims/vue-use-query-param-example).

## Extra options

### Debounce time

Internally, to be able to set multiple query parameters at once, we don't update the URL immediately after every change. We use `setTimeout` to debounce the updates.  
By default the debounce time is set to `0`, meaning it will update the URL as soon as possible.  
If however you want to delay this more, you can set the `debounceTime` option when adding the plugin to the Vue app.

```ts
app.use(useQueryParamPlugin, { debounceTime: 100 });
...
const foo = useQueryParam("foo", StringParam);
const bar = useQueryParam("bar", StringParam);

// the `foo` and `bar` query parameters in the URL won't be updated immediately, but only after 150ms.
// (50 ms for the bar timeout + 100ms for the debounce time)
foo.value = "fooval";
setTimeout(() => {
  bar.value = "barval";
}, 50);
```

# Credits

## How to publish a TypeScript package to npm

[TypeScript NPM Package Publishing: A Beginner’s Guide](https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c) (by Paul Ehikhuemen)

## Inspiration for this package

I'm originally a React dev and I made much use of the [use-query-params](https://www.npmjs.com/package/use-query-params) hook.

# Sponsors

[![ai-Gust](https://assets-global.website-files.com/631524ebcf6f3b0b4e472777/6583f4b10a91cd4e83995dc8_logo-aigust-lightbg.svg)](https://www.ai-gust.io/)

The original need for this plugin came when working on a project for [ai-Gust](https://www.ai-gust.io/). An initial implementation of `useQueryParam` was made there.  
They were so kind to let me make this into a separate npm module and make it open source for the world to enjoy.  
I've since built on this initial implementation.
