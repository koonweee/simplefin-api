const SIMPLEFIN_TOKEN = process.env.SIMPLEFIN_TOKEN;

if (!SIMPLEFIN_TOKEN) {
  throw new Error('SIMPLEFIN_TOKEN is not set');
}

