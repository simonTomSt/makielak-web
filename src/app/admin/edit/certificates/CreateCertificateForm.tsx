'use client';
import { useRouter } from 'next/navigation';
import {
  Form,
  Button,
  Input,
  Typography,
  toast,
  Spinner,
  FileUpload,
} from '@/components';
import { CertificatesType, useMutation } from '@/utils';
import { t } from '@/translations';
import { createCertificate, saveCertificatePdf } from '@/api/spa';
import { RowType } from '@/api';
import { useState } from 'react';

type FormValues = Omit<RowType<'certificates'>, 'id' | 'image'>;

type CreateCertificateFormProps = {
  type: CertificatesType;
};

const CreateCertificateForm = ({ type }: CreateCertificateFormProps) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const { mutate, loading } = useMutation({
    onSuccess: () => {
      toast.success(t.admin.edit.saved_successfully);
      setExpanded(false);
      router.refresh();
    },
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const handleSave = (certificate: FormValues) => {
    mutate(() => createCertificate({ ...certificate, type }));
  };

  if (!expanded) {
    return (
      <Button variant='outlined' onClick={() => setExpanded(true)}>
        {t.admin.edit.certificates.add_new}
      </Button>
    );
  }

  return (
    <div className='mt-10 rounded-lg border border-blue-gray-100 px-4 bg-white py-4'>
      <Typography variant='h5' className='mb-1.5'>
        {t.admin.edit.certificates.add_new}
      </Typography>
      <Form<FormValues> onSubmit={handleSave}>
        <Input label={t.admin.edit.certificates.edit_title} name='name' />
        <br />

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>
    </div>
  );
};

export default CreateCertificateForm;
