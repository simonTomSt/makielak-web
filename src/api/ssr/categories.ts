import { cache } from 'react';
import { createSSRClient } from './apiClient';

export const getAllCategories = cache(async () => {
  const apiClient = createSSRClient();

  return apiClient.from('categories').select();
});
