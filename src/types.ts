/**
 * Relay-style cursor-based pagination parameters
 * @see https://relay.dev/graphql/connections.htm
 *
 * Example usage:
 * ```
 * query {
 *   users(first: 10, after: "cursor") {
 *     edges {
 *       node {
 *         id
 *       }
 *     }
 *   }
 * }
 * ```
 */
export type RelayPagination = {
  /** Number of items to fetch forward (can't be used with `last`) */
  first?: number;
  /** Number of items to fetch backward (can't be used with `first`) */
  last?: number;
  /** Cursor to fetch items after (forward pagination) */
  after: string | null;
  /** Cursor to fetch items before (backward pagination) */
  before: string | null;
};
