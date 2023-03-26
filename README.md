# use-relay-pagination

[![npm version][npm-version-src]][npm-version-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-1a2b34.svg?style=flat-square)](https://prettier.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](https://opensource.org/licenses/MIT)


This is a React hook library to assist with GraphQL Relay pagination. The library provides a `usePagination` hook that can be used to retrieve pagination parameters such as `first`, `last`, `after`, and `before`.

## Installation

This library is designed to be used in a **Next.js** application. To install the library, simply run the following command:


```sh
yarn add use-relay-pagination
```

## Usage

To use the `usePagination` hook, import it into your component and call it like any other React hook:

```ts
import { usePagination } from 'use-relay-pagination';

function MyComponent() {
  const { first, last, after, before } = usePagination(10);

  // ...
}
```

The `usePagination` hook accepts a single argument, which is the number of items to display per page (default is 20).

The hook returns an object containing the following properties:

- `first`: The number of items to fetch from the beginning of the list.
- `last`: The number of items to fetch from the end of the list.
- `after`: The Relay cursor for the item after which to start fetching.
- `before`: The Relay cursor for the item before which to start fetching.

These properties can then be used to construct your GraphQL query for pagination.

## Examples

```gql
query MyQuery($first: Int, $last: Int, $after: String, $before: String) {
  items(first: $first, last: $last, after: $after, before: $before) {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

Here's an example of how you might use the `usePagination` hook in your component:

```ts
import { usePagination } from 'use-relay-pagination';
import { useQuery } from 'react-query';
import { MyQuery } from './MyQuery';

function MyComponent() {
  const { first, last, after, before } = usePagination(10);

  const { data, isLoading, isError } = useQuery(['myQuery', { first, last, after, before }], () =>
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: MyQuery,
        variables: { first, last, after, before },
      }),
    }).then((res) => res.json())
  );

  // ...
}
```

In this example, we use the `useQuery` hook from react-query to fetch data from our GraphQL server. We pass in an array as the first argument to `useQuery`, which contains the query key and variables. The `fetch` call inside the `useQuery` hook is then used to fetch the data from the server. We pass in the `MyQuery` and `variables` to the body of the request.

The `isLoading` and `isError` properties of the `useQuery` hook can be used to display loading and error states in your component.


## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Build the module using `yarn build`
4. Start development server using `yarn dev`

## 📑 License

This package is licensed under the [MIT License](./LICENSE)

### Notes

README proudly generated by ChatGPT :robot:

### To do

- [ ] Add tests & CI
- [ ] Support other router frameworks (outside Next.js)
- [ ] Release bot

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/dt/use-relay-pagination.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/use-relay-pagination
[npm-downloads-src]: https://img.shields.io/npm/v/use-relay-pagination/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/use-relay-pagination
[david-dm-src]: https://david-dm.org/gomah/use-relay-pagination/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/gomah/use-relay-pagination
