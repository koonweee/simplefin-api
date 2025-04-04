export interface Organization {
  /** Organization domain (e.g. "example.com"). Either domain or name will be present */
  domain?: string;
  /** Root URL of the organization's SimpleFIN server */
  sfinUrl: string;
  /** Human-readable organization name (e.g. "Example"). Either domain or name will be present */
  name?: string;
  /** URL to the organization's website */
  url?: string;
  /** Organization ID (e.g. "org_123") */
  id?: string;
}

export interface Transaction {
  /** Unique identifier for the transaction. Unique within the account */
  id: string;
  /** Timestamp when the transaction was posted (ie. actually cleared) */
  posted: number;
  /** Amount of the transaction. May be prefixed with a "-" for debits */
  amount: string;
  /** Human-readable description of the transaction */
  description: string;
  /** Timestamp when the transaction happened */
  transactedAt?: number;
  /** Indicated transaction is yet to be posted @default false */
  pending?: boolean;
  /** Optional extra transaction-specific data not defined in the SimpleFIN standard */
  extra?: Record<string, any>;
}

/**
 * Represents a financial account with its associated details and transactions
 */
export interface Account {
  /** Organization from which this account originates */
  org: Organization;

  /** String that uniquely identifies the account within the organization */
  id: string;

  /** Usually account name as seen in the organization's system */
  name: string;

  /** ISO 4217 currency code (e.g. "USD", "ZMW") */
  currency: string;

  /** The balance of the account as of balanceDate */
  balance: string;

  /** The available balance of the account as of balanceDate (ie. balance - pending transactions). May be omitted if same as balance */
  availableBalance?: string;

  /** Timestamp when the balance and availableBalance were last updated */
  balanceDate: number;

  /** List of a subset of Transactions for this account, ordered by posted */
  transactions?: Transaction[];

  /** Optional extra account-specific data not defined in the SimpleFIN standard */
  extra?: Record<string, any>;
}

export interface AccountSet {
  /**
   * Errors are formatted for display to the user
   */
  errors: string[];
  /**
   * List of requested accounts
   */
  accounts: Account[];
}

export interface AccountsQueryParams {
  /**
   * Start UNIX timestamp in seconds for transactions (inclusive)
   */
  startDate?: number;
  /**
   * End timestamp for transactions (exclusive)
   */
  endDate?: number;
  /**
   * If true, include pending transactions (if supported by account)
   * @default false
   */
  includePending?: boolean;
  /**
   * If specified, only return transactions for these accounts
   */
  accountIds?: string[];
  /**
   * If true, only return balances for accounts
   * @default false
   */
  onlyReturnBalances?: boolean;
}
