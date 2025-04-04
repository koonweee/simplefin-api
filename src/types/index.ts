export interface Organization {
  domain?: string;
  sfin_url: string;
  name?: string;
  url?: string;
  id?: string;
}

export interface Transaction {
  id: string;
  posted: number;
  amount: string;
  description: string;
  transacted_at?: number;
  pending?: boolean;
  extra?: Record<string, any>;
}

export interface Account {
  org: Organization;
  id: string;
  name: string;
  currency: string;
  balance: string;
  available_balance?: string;
  balance_date: number;
  transactions?: Transaction[];
  extra?: Record<string, any>;
}

export interface AccountSet {
  errors: string[];
  accounts: Account[];
}

export interface ServerInfo {
  versions: string[];
}

export interface SimpleFINConfig {
  baseUrl: string;
  accessToken?: string;
}

export interface AccountsQueryParams {
  start_date?: number;
  end_date?: number;
  pending?: boolean;
  account?: string[];
  balances_only?: boolean;
}
