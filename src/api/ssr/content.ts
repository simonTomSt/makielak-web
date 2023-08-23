import { cache } from 'react';
import { createSSRClient } from './apiClient';
import { RowType } from '..';

export const revalidate = 3600; // revalidate the data at most every hour

export const getAllContents = cache(async () => {
  const apiClient = createSSRClient();

  return apiClient.from('content').select();
});

export const getAllContentImages = cache(async () => {
  const apiClient = createSSRClient();

  const { data, error } = await apiClient.from('content_images').select(`
    *,
    image (
      *
    )
  `);

  return {
    error,
    data:
      data?.map((record) => ({
        ...record,
        image: (record.image as unknown as RowType<'images'>)?.url,
      })) || [],
  };
});
