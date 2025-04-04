/**
 * Contains types for internal use (raw responses from the SimpleFIN server)
 */

import { Account, AccountSet, Organization, Transaction } from "./api";

export type TransactionResponse = Omit<Transaction, 'transactedAt'> & {
  'transacted_at': number;
};

export type AccountResponse = Omit<Account, 'availableBalance' | 'balanceDate' | 'transactions' | 'org'> & {
  'available-balance': string;
  'balance-date': number;
  transactions: TransactionResponse[];
  org: OrganizationResponse;
};

export type AccountSetResponse = Omit<AccountSet, 'accounts'> & {
  accounts: AccountResponse[];
};

export type OrganizationResponse = Omit<Organization, 'sfinUrl'> & {
  'sfin-url': string;
};

