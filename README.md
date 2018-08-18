# Chakra Framework

[![A Cubefuse Project](https://img.shields.io/badge/a_project_by-cubefuse-blue.svg?style=for-the-badge)](http://cubefuse.org)
[![Code Standard Style Compliant](https://img.shields.io/badge/code-standard-green.svg?style=for-the-badge)](https://github.com/standard/standard)
[![Readme Standard Style Compliant](https://img.shields.io/badge/readme-standard-green.svg?style=for-the-badge)](https://github.com/RichardLitt/standard-readme)
[![Travis CI](https://img.shields.io/travis/cubefuse/chakra.svg?style=for-the-badge)](https://travis-ci.org/cubefuse/chakra)
[![Codecov](https://img.shields.io/codecov/c/github/cubefuse/chakra.svg?style=for-the-badge)](https://codecov.io/gh/cubefuse/chakra)
[![Codacy](https://img.shields.io/codacy/grade/0b9e0de4754b4f4e926a0f6ac187cfdb.svg?style=for-the-badge)](https://app.codacy.com/app/Cubefuse/chakra)
[![npm](https://img.shields.io/npm/v/@chakrajs/framework.svg?style=for-the-badge)](https://www.npmjs.com/package/@chakrajs/framework)

[![Documentation](https://img.shields.io/badge/Documentation-blue.svg?style=for-the-badge)](https://cubefuse.github.io/chakra-docs)
[![API Reference](https://img.shields.io/badge/API-Reference-blue.svg?style=for-the-badge)](https://cubefuse.github.io/chakra)


>  Modular JavaScript framework for building decentralized apps

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Getting Started

### npm package

This is the recommended method for using Chakra.

```sh
npm install @chakrajs/framework
```

If you are using `yarn` (recommended), use this instead.

```sh
yarn add @chakrajs/framework
```

### `<script>` include
Directly include with `<script>` tag on your html pages. This only works for web browsers.
`Chakra` would be included as a global variable.

- Download and use

Downloads can be found in the [GitHub Releases](https://github.com/cubefuse/chakra/releases) page.

- Use from CDN

```html
<!-- Development version -->
<script src="https://unpkg.com/@chakrajs/framework/dist/index.js"></script>

<!-- Minified version -->
<script src="https://unpkg.com/@chakrajs/framework/dist/index.min.js"></script>
```

Please read the [Documentation](https://cubefuse.github.io/chakra-docs) and the [API Reference](https://cubefuse.github.io/chakra) to start building Chakra Apps.

## Development Setup

```sh
git clone https://github.com/cubefuse/chakra.git
cd chakra
yarn install
``` 

- The code can be built for both Node.js and the browser by `yarn build`.
- To run the tests and generate coverage reports, use `yarn test` and `yarn coverage`.
- Code linting with the JavaScript Standard Style is available with `yarn lint`.
- Code documentation can be built with `yarn docs`.

## Maintainers

[@mprasanjith](https://github.com/mprasanjith)

## Contribute

We welcome your pull requests and bug reports.

## License

MIT © 2018 Cubefuse
