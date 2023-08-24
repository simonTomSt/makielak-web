import { RowType } from '..';
import { createSPAClient } from './apiClient';

export const createProduct = async (
  category: Omit<RowType<'categories'>, 'thumb_image' | 'background_image'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('categories').insert(category);
};

export const updateProduct = async (
  category: Omit<RowType<'categories'>, 'thumb_image' | 'background_image'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('categories').update(category).eq('id', category.id);
};

export const saveCategoryImage = async (
  categoryId: string,
  image: RowType<'images'>
) => {
  const apiClient = createSPAClient();

  return apiClient
    .from('categories')
    .update({ thumb_image: image.id })
    .eq('id', categoryId);
};
