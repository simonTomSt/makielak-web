import { RowType } from '..';
import { createSPAClient } from './apiClient';
import { deleteImageById } from './storage';

export const createProduct = async (
  product: Omit<RowType<'products'>, 'image' | 'id'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('products').insert(product);
};

export const updateProduct = async (
  product: Omit<RowType<'products'>, 'image'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('products').update(product).eq('id', product.id);
};

export const saveProductImage = async (
  productId: string,
  image: RowType<'images'>
) => {
  const apiClient = createSPAClient();

  return apiClient
    .from('products')
    .update({ image: image.id })
    .eq('id', productId);
};

export const deleteProduct = async (productId: string) => {
  const apiClient = createSPAClient();

  const { data: productToDelete } = await apiClient
    .from('products')
    .select()
    .eq('id', productId)
    .single();

  if (productToDelete?.image) {
    await deleteImageById(productToDelete.image);
  }

  return apiClient.from('products').delete().eq('id', productId);
};
