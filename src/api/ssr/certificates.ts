import { cache } from 'react';
import { createSSRClient } from './apiClient';

export const getAllCertificates = cache(async () => {
  const apiClient = createSSRClient();

  return apiClient.from('certificates').select();
});
