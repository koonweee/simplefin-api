/**
 * Parses responses from the SimpleFIN server into the types defined in `src/types/api.ts`
 */

import { Account, AccountSet, Organization, Transaction } from "../types/api";
import { AccountResponse, AccountSetResponse, OrganizationResponse, TransactionResponse } from "../types/internal";

export function parseAccountSet(response: AccountSetResponse): AccountSet {
  return {
    ...response,
    accounts: response.accounts.map(parseAccount),
  };
}

function parseAccount(response: AccountResponse): Account {
  return {
    ...response,
    availableBalance: response['available-balance'],
    balanceDate: response['balance-date'],
    org: parseOrganization(response.org),
    transactions: response.transactions.map(parseTransaction),
  };
}

function parseOrganization(response: OrganizationResponse): Organization {
  return {
    ...response,
    sfinUrl: response['sfin-url'],
  };
}

function parseTransaction(response: TransactionResponse): Transaction {
  return {
    ...response,
    transactedAt: response['transacted_at'],
  };
}
