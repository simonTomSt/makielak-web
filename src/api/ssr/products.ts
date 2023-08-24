import { cache } from 'react';
import { createSSRClient } from './apiClient';

export const getAllProducts = cache(async () => {
  const apiClient = createSSRClient();

  return apiClient.from('products').select();
});
