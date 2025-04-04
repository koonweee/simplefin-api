import { SimpleFINClient } from "../client/simplefin-client";
import fs from 'fs';

/**
 * Before running this example, you need to set the SIMPLEFIN_TOKEN environment variable.
 * ie. export SIMPLEFIN_TOKEN=<your-token>
 */
const SIMPLEFIN_TOKEN = process.env.SIMPLEFIN_TOKEN;

async function main() {
  if (!SIMPLEFIN_TOKEN) {
    throw new Error('SIMPLEFIN_TOKEN is not set');
  }
  /**
   * Claim access URL from token. Token can be found in the SimpleFIN Bridge dashboard
   * NOTE: Each token can only be used to claim the access URL once. Successive requests will fail.
   * You should be storing the access URL and reusing it for future requests.
   * */
  const accessUrl = await SimpleFINClient.claimAccessUrl(SIMPLEFIN_TOKEN);
  /** Create a client from the access URL */
  const client = new SimpleFINClient(accessUrl);
  /** Get accounts from the client */
  const accountSet = await client.getAccounts();
  /** Log number of accounts */
  console.log(`Found ${accountSet.accounts.length} accounts`);
  /** Dump accounts to JSON file */
  fs.writeFileSync('accounts.json', JSON.stringify(accountSet, null, 2));
}

main();
