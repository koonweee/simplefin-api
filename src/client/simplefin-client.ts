import axios, { AxiosInstance } from 'axios';
import {
  SimpleFINConfig,
  ServerInfo,
  AccountSet,
  AccountsQueryParams
} from '../types';

export class SimpleFINClient {
  private client: AxiosInstance;
  private config: SimpleFINConfig;

  constructor(config: SimpleFINConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: config.accessToken ? {
        Authorization: `Basic ${config.accessToken}`
      } : {}
    });
  }

  /**
   * Get server information and supported versions
   */
  async getInfo(): Promise<ServerInfo> {
    const response = await this.client.get('/info');
    return response.data;
  }

  /**
   * Get the URL for creating a new SimpleFIN token
   */
  getCreateUrl(): string {
    return `${this.config.baseUrl}/create`;
  }

  /**
   * Claim a SimpleFIN token to get an access URL
   * @param token Base64 encoded token received from user
   */
  async claimToken(token: string): Promise<string> {
    const decodedUrl = Buffer.from(token, 'base64').toString('utf-8');
    const response = await this.client.post(decodedUrl);
    return response.data;
  }

  /**
   * Get accounts and transactions data
   * @param params Query parameters for filtering accounts and transactions
   */
  async getAccounts(params?: AccountsQueryParams): Promise<AccountSet> {
    const queryParams = new URLSearchParams();

    if (params) {
      if (params.start_date) queryParams.append('start-date', params.start_date.toString());
      if (params.end_date) queryParams.append('end-date', params.end_date.toString());
      if (params.pending) queryParams.append('pending', '1');
      if (params.balances_only) queryParams.append('balances-only', '1');
      if (params.account) {
        params.account.forEach(acc => queryParams.append('account', acc));
      }
    }

    const response = await this.client.get(`/accounts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    return response.data;
  }

  /**
   * Update the access token for authenticated requests
   * @param accessToken Base64 encoded access token
   */
  setAccessToken(accessToken: string) {
    this.config.accessToken = accessToken;
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        Authorization: `Basic ${accessToken}`
      }
    });
  }
}
