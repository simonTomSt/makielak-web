import { v4 as uuidv4 } from 'uuid';
import { createSPAClient } from './apiClient';
import { RowType } from '..';

export const storeFile = async (file: File) => {
  const apiClient = createSPAClient();

  return apiClient.storage
    .from('test')
    .upload('/private/' + `${uuidv4()}_${file?.name}`, file);
};

export const deleteStoredFile = async (fileURL: string) => {
  const apiClient = createSPAClient();

  return apiClient.storage.from('test').remove([fileURL]);
};

export const updateStoredFile = async (fileURL: string, file: File) => {
  await deleteStoredFile(fileURL);
  return storeFile(file);
};

export const storeImage = async (
  imageFile: File,
  existingImage?: string
): Promise<RowType<'images'> | undefined> => {
  const apiClient = createSPAClient();

  if (existingImage) {
    const { data: updatedImage } = await updateStoredFile(
      existingImage,
      imageFile
    );

    const { data: images } = await apiClient
      .from('images')
      .update({ url: updatedImage?.path })
      .eq('url', existingImage)
      .select();

    return images?.[0];
  }

  const { data: imageUrl } = await storeFile(imageFile);

  if (!imageUrl?.path) throw Error("Couldn't store file");

  const { data: images } = await apiClient
    .from('images')
    .insert({ url: imageUrl.path })
    .select();
  return images?.[0];
};

export const deleteImageById = async (imageId: string) => {
  const apiClient = createSPAClient();

  const { data: imageToDelete } = await apiClient
    .from('images')
    .select()
    .eq('id', imageId)
    .single();

  if (!imageToDelete?.url) return null;

  await deleteStoredFile(imageToDelete.url);
  return apiClient.from('images').delete().eq('id', imageId);
};
