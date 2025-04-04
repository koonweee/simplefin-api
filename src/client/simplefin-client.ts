import axios, { AxiosInstance } from 'axios';
import {
  AccountSet,
  AccountsQueryParams
} from '../types';
import { AccountSetResponse } from '../types/internal';
import { parseAccountSet } from './response-parsers';

export class SimpleFINClient {
  private client: AxiosInstance;

  /**
   * Base64 decodes a SimpleFIN token to get a claim URL
   * Then makes a POST request to the claim URL to get an access URL
   * Note that each token can only be claimed once
   * (the claim URL expires after the first POST request)
   * @param simplefinToken Base64 encoded token received from user
   * @returns Access URL
   */
  static async claimAccessUrl(simplefinToken: string): Promise<string> {
    const decodedUrl = Buffer.from(simplefinToken, 'base64').toString('utf-8');
    const response = await axios.post(decodedUrl);
    return response.data;
  }

  /**
   * Create a new SimpleFIN client from an access URL
   * @param config Configuration for the client (access URL)
   * @returns instance of SimpleFIN client
   */
  constructor(accessUrl: string) {
    this.client = axios.create({
      baseURL: accessUrl,
    });
  }

  /**
   * Retrieve one or many accounts (account information and transactions)
   * Makes a GET request to the `/accounts` endpoint on the access URL
   * @param params Query parameters for filtering accounts and transactions
   */
  async getAccounts(params?: AccountsQueryParams): Promise<AccountSet> {
    const queryParams = new URLSearchParams();

    if (params) {
      if (params.startDate) queryParams.append('start-date', params.startDate.toString());
      if (params.endDate) queryParams.append('end-date', params.endDate.toString());
      if (params.includePending) queryParams.append('pending', '1');
      if (params.onlyReturnBalances) queryParams.append('balances-only', '1');
      if (params.accountIds) {
        params.accountIds.forEach(acc => queryParams.append('account', acc));
      }
    }

    const queryString = queryParams.toString().length > 0 ? `?${queryParams.toString()}` : '';

    const response = await this.client.get<AccountSetResponse>(`/accounts${queryString}`);
    return parseAccountSet(response.data);
  }
}
