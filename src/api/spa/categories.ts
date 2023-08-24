import { RowType } from '..';
import { createSPAClient } from './apiClient';
import { deleteImageById } from './storage';

export const createCategory = async (
  category: Omit<RowType<'categories'>, 'thumb_image' | 'background_image'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('categories').insert(category);
};

export const getCategoryById = async (id: string) => {
  const apiClient = createSPAClient();

  return apiClient.from('categories').select().eq('id', id).single();
};

export const updateCategory = async ({
  id,
  on_home,
  description,
  name,
}: Omit<RowType<'categories'>, 'thumb_image' | 'background_image'>) => {
  const apiClient = createSPAClient();

  return apiClient
    .from('categories')
    .update({ description, name, on_home })
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
