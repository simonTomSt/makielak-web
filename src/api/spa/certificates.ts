import { RowType } from '..';
import { createSPAClient } from './apiClient';
import { deleteImageById, deleteStoredFile, storePDF } from './storage';

export const createCertificate = async (
  certificate: Omit<RowType<'certificates'>, 'id' | 'image'>
) => {
  const apiClient = createSPAClient();

  return apiClient.from('certificates').insert(certificate);
};

export const editCertificate = async (
  certificateId: string,
  certificate: Omit<RowType<'certificates'>, 'id' | 'image'>
) => {
  const apiClient = createSPAClient();

  await apiClient.from('certificates').delete().eq('key', certificateId);

  return apiClient
    .from('certificates')
    .update(certificate)
    .eq('id', certificateId);
};

export const saveCertificateImage = async (
  certificateId: string,
  image: RowType<'images'>
) => {
  const apiClient = createSPAClient();

  return apiClient
    .from('certificates')
    .update({ image: image.id })
    .eq('id', certificateId);
};

export const saveCertificatePdf = async (pdf: File, certificateId: string) => {
  const apiClient = createSPAClient();

  const { data: certificate } = await apiClient
    .from('certificates')
    .select()
    .eq('id', certificateId)
    .single();

  const { data: storedPdfData } = await storePDF(
    pdf,
    certificate?.pdf_url || undefined
  );

  return apiClient
    .from('certificates')
    .update({ pdf_url: storedPdfData?.path })
    .eq('id', certificateId);
};

export const deleteCertificate = async (certificateId: string) => {
  const apiClient = createSPAClient();

  const { data: certificateToDelete } = await apiClient
    .from('certificates')
    .select()
    .eq('id', certificateId)
    .single();

  if (certificateToDelete?.image) {
    await deleteImageById(certificateToDelete.image);
  }

  if (certificateToDelete?.pdf_url) {
    await deleteStoredFile(certificateToDelete.pdf_url);
  }

  return apiClient.from('certificates').delete().eq('id', certificateId);
};
