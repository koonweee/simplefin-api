# SimpleFIN API TypeScript Client & Types

A (unofficial) TypeScript wrapper for the SimpleFIN API that provides type-safe access to SimpleFIN's financial data aggregation services. This client implements the [SimpleFIN Protocol](https://www.simplefin.org/protocol.html) (v1.0.7-draft as of release).

[![npm version](https://badge.fury.io/js/simplefin-api.svg)](https://www.npmjs.com/package/simplefin-api)
[![npm downloads](https://img.shields.io/npm/dm/simplefin-api.svg)](https://www.npmjs.com/package/simplefin-api)

## Installation 📦

```bash
npm install simplefin-api
```

## Usage

Basic usage:

```typescript
import { SimpleFINClient } from 'simplefin-api';

// Claim an access URL using a SimpleFIN token
const accessUrl = await SimpleFINClient.claimAccessUrl('user-provided-token');

// Initialize the client with the access URL
const client = new SimpleFINClient(accessUrl);

// Get accounts data with optional filters
const accounts = await client.getAccounts({
  startDate: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // Starting 30 days ago
  includePending: true
});

console.log(accounts);
```

See/run the example at [examples/main.ts](src/examples/main.ts) using `npm run example`.

## API Reference 📖

### SimpleFINClient

The main client class for interacting with the SimpleFIN API.

#### Static Methods

- `claimAccessUrl(simplefinToken: string): Promise<string>`: Use a SimpleFIN token to claim an access URL

> **⚠️ Important**: Each SimpleFIN token can only be used to claim an access URL once. The access URL should be securely stored and reused for future requests - attempting to claim the same token again will fail.

#### Constructor

```typescript
constructor(accessUrl: string)
```

#### Methods

- `getAccounts(params?: AccountsQueryParams): Promise<AccountSet>`: Retrieves account information and transactions
  - Optional query parameters:
    - `startDate`: Start timestamp for transactions (inclusive)
    - `endDate`: End timestamp for transactions (exclusive)
    - `includePending`: Include pending transactions (defaults to false)
    - `accountIds`: If specified, only return transactions for specific accounts
    - `onlyReturnBalances`: Only return account balances without transactions (defaults to false)

### Types

See the type definitions in [src/types/api.ts](src/types/api.ts) for detailed information about:
- `Account`
- `Transaction`
- `Organization`
- `AccountSet`
- `AccountsQueryParams`

> **💡 Note**: The `Account` and `Transaction` types support additional attributes beyond the standard fields. Different financial services may include extra data like categories, merchant info, or investment details. These additional fields are typed as `any` - you'll need to handle the types appropriately in your code.
>
> For example, an investment account might include holdings:
> ```typescript
> const account = accountSet.accounts[0];
>
> // Type the additional fields you expect
> interface Holding {
>   symbol: string;
>   quantity: number;
>   price: number;
> }
>
> if (account.holdings) {
>   // Cast to your expected type
>   const holdings = account.holdings as Holding[];
>   holdings.forEach(holding => {
>     console.log(`${holding.symbol}: ${holding.quantity} shares @ ${holding.price}`);
>   });
> }
> ```
