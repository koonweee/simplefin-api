import { parseAccountSet } from '../response-parsers';
import { AccountSetResponse } from '../../types/internal';

describe('Response Parsers', () => {
  describe('parseAccountSet', () => {
    it('should correctly parse a complete account set response, including extra fields in accounts or transactions', () => {
      const mockResponse: AccountSetResponse = {
        errors: [],
        accounts: [{
          id: 'acc_123',
          name: 'Checking Account',
          currency: 'USD',
          balance: '1000.00',
          'available-balance': '900.00',
          'balance-date': 1680000000,
          org: {
            domain: 'example.com',
            'sfin-url': 'https://example.com/sfin',
            name: 'Example Bank',
            url: 'https://example.com',
            id: 'org_123'
          },
          'extra-field': 'extra-value',
          transactions: [{
            id: 'tx_123',
            posted: 1679900000,
            amount: '-50.00',
            description: 'Coffee Shop',
            'transacted_at': 1679890000,
            pending: false,
            'extra-field': 'extra-value'
          }]
        }]
      };

      const result = parseAccountSet(mockResponse);

      expect(result).toEqual({
        errors: [],
        accounts: [{
          id: 'acc_123',
          name: 'Checking Account',
          currency: 'USD',
          balance: '1000.00',
          availableBalance: '900.00',
          balanceDate: 1680000000,
          org: {
            domain: 'example.com',
            sfinUrl: 'https://example.com/sfin',
            name: 'Example Bank',
            url: 'https://example.com',
            id: 'org_123'
          },
          'extra-field': 'extra-value',
          transactions: [{
            id: 'tx_123',
            posted: 1679900000,
            amount: '-50.00',
            description: 'Coffee Shop',
            transactedAt: 1679890000,
            pending: false,
            'extra-field': 'extra-value'
          }]
        }]
      });
    });

    it('should handle empty account lists', () => {
      const mockResponse: AccountSetResponse = {
        errors: [],
        accounts: []
      };

      const result = parseAccountSet(mockResponse);

      expect(result).toEqual({
        errors: [],
        accounts: []
      });
    });

    it('should handle accounts without optional fields', () => {
      const mockResponse: AccountSetResponse = {
        errors: [],
        accounts: [{
          id: 'acc_123',
          name: 'Basic Account',
          currency: 'USD',
          balance: '1000.00',
          'available-balance': '1000.00',
          'balance-date': 1680000000,
          org: {
            'sfin-url': 'https://example.com/sfin'
          },
          transactions: []
        }]
      };

      const result = parseAccountSet(mockResponse);

      expect(result).toEqual({
        errors: [],
        accounts: [{
          id: 'acc_123',
          name: 'Basic Account',
          currency: 'USD',
          balance: '1000.00',
          availableBalance: '1000.00',
          balanceDate: 1680000000,
          org: {
            sfinUrl: 'https://example.com/sfin'
          },
          transactions: []
        }]
      });
    });

    it('should handle error messages', () => {
      const mockResponse: AccountSetResponse = {
        errors: ['Failed to fetch account ABC'],
        accounts: []
      };

      const result = parseAccountSet(mockResponse);

      expect(result).toEqual({
        errors: ['Failed to fetch account ABC'],
        accounts: []
      });
    });
  });
});
