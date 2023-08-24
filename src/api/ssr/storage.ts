import { createSSRClient } from './apiClient';

export const getImageById = async (imageId: string) => {
  const apiClient = createSSRClient();

  const { data } = await apiClient
    .from('images')
    .select()
    .eq('id', imageId)
    .single();

  return data;
};
