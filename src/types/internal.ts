/**
 * Contains types for internal use (raw responses from the SimpleFIN server)
 */
import { Account, Organization, Transaction } from "./api";

export type TransactionResponse = Omit<Transaction, 'transactedAt'> & {
  'transacted_at': string;
};

export type AccountResponse = Omit<Account, 'availableBalance' | 'balanceDate' | 'transactions' | 'organization'> & {
  'available-balance': string;
  'balance-date': string;
  transactions: TransactionResponse[];
};


export type OrganizationResponse = Omit<Organization, 'sfinUrl'> & {
  'sfin-url': string;
};

