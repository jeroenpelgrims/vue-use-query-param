NOTE: This will only work when using `vue-router`.

## Features

- Get & set query parameters from the URL in a typesafe way
- Use query parameters like regular ref's

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

```ts
import { StringParam, useQueryParam } from "vue-use-query-param";

// foo is a WritableComputedRef<string | null>
// use it like any other ref
const foo = useQueryParam("foo", StringParam);
```

### Non-nullable query parameters (default values)

If your query parameter should always have a value, you can set a default value like this:

```ts
import { StringParam, useQueryParam, withDefault } from "vue-use-query-param";
const foo = useQueryParam("foo", withDefault(StringParam, "bar"));

// NOTE: Unfortunately the typing is not 100% correct here, since the type of foo is still `WritableComputedRef<string | null>`.
```

### Supported types

Currently only a few basic types are supported.

- `StringParam`: for strings
- `NumberParam`: for numbers (integers and floats)
- `ObjectParam`: custom Objects that will be serialized to JSON and then encoded using `encodeURIComponent`.
- `BooleanParam`: for booleans
- `DateParam`: for dates

# Credits

## How to publish a TypeScript package to npm

[TypeScript NPM Package Publishing: A Beginner’s Guide](https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c) (by Paul Ehikhuemen)

## Inspiration for this package

I'm originally a React dev and I made much use of the [use-query-params](https://www.npmjs.com/package/use-query-params) hook.

# Sponsors

[![Ai-Gust](https://assets-global.website-files.com/631524ebcf6f3b0b4e472777/6583f4b10a91cd4e83995dc8_logo-aigust-lightbg.svg)](https://www.ai-gust.io/)

The original need for this plugin came when working on a project for [Ai-Gust](https://www.ai-gust.io/). An initial implementation for this plugin was made there.  
They were so kind to let me make this into a separate npm module and make it open source for the world to enjoy.  
I've since built on this initial implementation.
