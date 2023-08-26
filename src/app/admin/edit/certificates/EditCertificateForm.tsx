'use client';

import { RowType } from '@/api';
import {
  deleteCertificate,
  editCertificate,
  saveCertificateImage,
  saveCertificatePdf,
} from '@/api/spa';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  FileUpload,
  Form,
  ImageUpload,
  Input,
  Spinner,
  Typography,
  toast,
} from '@/components';
import { t } from '@/translations';
import { CertificatesType, useMutation } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type EditCertificateFormProps = {
  certificate: RowType<'certificates'>;
  thumbImage: RowType<'images'> | null;
  type: CertificatesType;
};

type FormValues = Omit<RowType<'certificates'>, 'id' | 'image'>;

const EditCertificateForm = ({
  certificate,
  type,
  thumbImage,
}: EditCertificateFormProps) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate, loading } = useMutation({
    onSuccess: () => {
      toast.success(t.admin.edit.saved_successfully);
      router.refresh();
    },
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const { mutate: deleteMutate, loading: deleteLoading } = useMutation({
    onSuccess: () => {
      toast.success(t.admin.edit.deleted_successfully);
      setIsDeleteOpen(false);
      router.refresh();
    },
    onError: () => toast.error(t.admin.edit.could_not_delete),
  });

  const handleSave = (formCertificate: FormValues) => {
    mutate(() => editCertificate(certificate.id, { ...formCertificate, type }));
  };

  const onFileSelect = (file: File) => {
    mutate(() => saveCertificatePdf(file, certificate.id));
  };

  const onImageSelect = (uploadedImage: RowType<'images'>) => {
    mutate(() => saveCertificateImage(certificate.id, uploadedImage));
  };

  const handleDelete = () => {
    deleteMutate(() => deleteCertificate(certificate.id));
  };

  return (
    <div>
      <Form<FormValues> onSubmit={handleSave}>
        <Input
          label={t.admin.edit.certificates.edit_title}
          name='name'
          defaultValue={certificate.name || ''}
        />
        <br />
        <FileUpload
          label={t.admin.edit.certificates.upload_pdf_file}
          initialFileName={certificate.pdf_url || ''}
          onFileSelect={onFileSelect}
        />
        <br />

        <ImageUpload
          label={t.admin.edit.certificates.upload_thumbnail}
          initialImage={thumbImage?.url || undefined}
          onFileSelect={onImageSelect}
        />
        <br />

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>

      <Dialog open={isDeleteOpen} handler={setIsDeleteOpen}>
        <DialogHeader>
          {t.admin.edit.certificates.delete_certificate_confirmation}
        </DialogHeader>
        <DialogBody>
          {t.admin.edit.certificates.delete_certificate_confirmation_body}
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            onClick={() => setIsDeleteOpen(false)}
            className='mr-1'
          >
            <span>{t.admin.edit.certificates.no_keep}</span>
          </Button>
          <Button
            variant='text'
            color='red'
            disabled={deleteLoading}
            onClick={handleDelete}
          >
            <span>{t.admin.edit.certificates.yes_delete}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EditCertificateForm;
