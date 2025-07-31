import { createClient } from 'next-sanity';

import { config } from './config';

export const client = createClient({
  ...config,
  perspective: 'published',
});

export const previewClient = createClient({
  ...config,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
});
