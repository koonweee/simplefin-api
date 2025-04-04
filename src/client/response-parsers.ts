/**
 * Parses responses from the SimpleFIN server into the types defined in `src/types/api.ts`
 */

import { Account, AccountSet, Organization, Transaction } from "../types/api";
import { AccountResponse, AccountSetResponse, OrganizationResponse, TransactionResponse } from "../types/internal";

export function parseAccountSet(response: AccountSetResponse): AccountSet {
  const { accounts, ...rest } = response;
  return {
    ...rest,
    accounts: accounts.map(parseAccount),
  };
}

function parseAccount(response: AccountResponse): Account {
  const { 'available-balance': availableBalance, 'balance-date': balanceDate, org: orgResponse, transactions: transactionsResponse, id, name, currency, balance, ...rest } = response;
  return {
    ...rest,
    availableBalance,
    balanceDate,
    org: parseOrganization(orgResponse),
    transactions: transactionsResponse.map(parseTransaction),
    id,
    name,
    currency,
    balance,
  };
}

function parseOrganization(response: OrganizationResponse): Organization {
  const { 'sfin-url': sfinUrl, ...rest } = response;
  return {
    ...rest,
    sfinUrl,
  };
}

function parseTransaction(response: TransactionResponse): Transaction {
  const { 'transacted_at': transactedAt, id, posted, amount, description, ...rest } = response;
  return {
    ...rest,
    transactedAt,
    id,
    posted,
    amount,
    description,
  };
}
