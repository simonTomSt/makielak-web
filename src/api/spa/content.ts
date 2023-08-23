import { ContentImagesKey, ContentKey } from '@/utils';
import { createSPAClient } from './apiClient';
import { RowType } from '..';

export const saveContent = async (key: ContentKey, content: string) => {
  const apiClient = createSPAClient();

  await apiClient.from('content').delete().eq('key', key);

  return apiClient.from('content').insert({ key, content });
};

export const saveFile = async (key: ContentKey, content: string) => {
  const apiClient = createSPAClient();

  await apiClient.from('content').delete().eq('key', key);

  return apiClient.from('content').insert({ key, content });
};

export const saveHomeServiceItem = async (key: ContentKey, content: string) => {
  const apiClient = createSPAClient();

  await apiClient.from('content').delete().eq('key', key);

  return apiClient.from('content').insert({ key, content });
};

export const saveContentImage = async (
  key: ContentImagesKey,
  image: RowType<'images'>
) => {
  const apiClient = createSPAClient();

  const { data } = await apiClient
    .from('content_images')
    .select()
    .eq('key', key);

  if (data) {
    return apiClient
      .from('content_images')
      .update({ image: image.id })
      .eq('key', key);
  }

  return apiClient.from('content_images').insert({ key, image: image.id });
};
