import { RowType } from '..';
import { createSPAClient } from './apiClient';
import { deleteImageById } from './storage';

export const createCategory = async (
  category: Omit<RowType<'categories'>, 'thumb_image' | 'background_image'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('categories').insert(category);
};

export const updateCategory = async ({
  id,
  description,
  name,
}: Omit<RowType<'categories'>, 'thumb_image' | 'background_image'>) => {
  const apiClient = createSPAClient();

  console.log(id, description, name);

  return apiClient
    .from('categories')
    .update({ description, name })
    .eq('id', id);
};

export const saveCategoryThumbImage = async (
  categoryId: string,
  image: RowType<'images'>
) => {
  const apiClient = createSPAClient();

  return apiClient
    .from('categories')
    .update({ thumb_image: image.id })
    .eq('id', categoryId);
};

export const deleteCategory = async (categoryId: string) => {
  const apiClient = createSPAClient();

  const { data: categoryToDelete } = await apiClient
    .from('categories')
    .select()
    .eq('id', categoryId)
    .single();

  if (categoryToDelete?.thumb_image) {
    await deleteImageById(categoryToDelete.thumb_image);
  }

  return apiClient.from('categories').delete().eq('id', categoryId);
};
