import { defineConfig } from 'sanity';

export const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  studioUrl: '/studio',
});

export const { projectId, dataset, apiVersion, useCdn, studioUrl } = config;
