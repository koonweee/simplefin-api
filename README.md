# SimpleFIN API TypeScript Client

A TypeScript wrapper for the SimpleFIN API that provides type-safe access to SimpleFIN's financial data aggregation services.

## Installation

```bash
npm install simplefin-api
```

## Usage

```typescript
import { SimpleFINClient } from 'simplefin-api';

// Initialize the client
const client = new SimpleFINClient({
  baseUrl: 'https://bridge.simplefin.org/simplefin'
});

// Get server info
const info = await client.getInfo();
console.log(info.versions);

// Get the URL for creating a new token
const createUrl = client.getCreateUrl();
// Direct user to this URL to get their token

// Claim a token (after user provides it)
const accessUrl = await client.claimToken('user-provided-token');
client.setAccessToken(accessUrl);

// Get accounts data
const accounts = await client.getAccounts({
  start_date: Date.now() - 30 * 24 * 60 * 60 * 1000, // Last 30 days
  pending: true
});
console.log(accounts);
```

## API Reference

### SimpleFINClient

The main client class for interacting with the SimpleFIN API.

#### Constructor

```typescript
constructor(config: SimpleFINConfig)
```

- `config.baseUrl`: The base URL of the SimpleFIN server
- `config.accessToken`: (Optional) The access token for authenticated requests

#### Methods

- `getInfo()`: Get server information and supported versions
- `getCreateUrl()`: Get the URL for creating a new SimpleFIN token
- `claimToken(token: string)`: Claim a SimpleFIN token to get an access URL
- `getAccounts(params?: AccountsQueryParams)`: Get accounts and transactions data
- `setAccessToken(accessToken: string)`: Update the access token for authenticated requests

### Types

The package exports TypeScript interfaces for all SimpleFIN data structures:

- `Organization`
- `Transaction`
- `Account`
- `AccountSet`
- `ServerInfo`
- `SimpleFINConfig`
- `AccountsQueryParams`
