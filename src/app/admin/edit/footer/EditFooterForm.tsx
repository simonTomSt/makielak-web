'use client';

import { saveContent } from '@/api/spa';
import {
  Button,
  Card,
  ContentEditor,
  Form,
  Spinner,
  Typography,
  toast,
} from '@/components';
import { t } from '@/translations';
import { ContentKey, useMutation } from '@/utils';

type EditFooterFormProps = {
  contentData: Record<ContentKey, string>;
};

type FormValues = {
  title: string;
  email: string;
  phone: string;
  address: string;
};

const EditFooterForm = ({ contentData }: EditFooterFormProps) => {
  const { mutate, loading } = useMutation({
    onSuccess: () => toast.success(t.admin.edit.saved_successfully),
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const handleSave = ({ title, email, phone, address }: FormValues) => {
    mutate(() =>
      Promise.all([
        saveContent(ContentKey.FooterTitle, title),
        saveContent(ContentKey.FooterEmail, email),
        saveContent(ContentKey.FooterPhone, phone),
        saveContent(ContentKey.FooterAddress, address),
      ])
    );
  };

  return (
    <Card className='p-5 mb-5'>
      <Form<FormValues> onSubmit={handleSave}>
        <div className='my-4'>
          <Typography variant='h6'>
            {t.admin.edit.footer.edit_footer_title}
          </Typography>
          <ContentEditor
            height={100}
            name='title'
            initialValue={contentData[ContentKey.FooterTitle]}
          />
        </div>

        <div className='my-4'>
          <Typography variant='h6'>
            {t.admin.edit.footer.edit_footer_email}
          </Typography>
          <ContentEditor
            height={100}
            name='email'
            initialValue={contentData[ContentKey.FooterEmail]}
          />
        </div>

        <div className='my-4'>
          <Typography variant='h6'>
            {t.admin.edit.footer.edit_footer_phone}
          </Typography>
          <ContentEditor
            height={100}
            name='phone'
            initialValue={contentData[ContentKey.FooterPhone]}
          />
        </div>

        <div className='my-4'>
          <Typography variant='h6'>
            {t.admin.edit.footer.edit_footer_address}
          </Typography>

          <ContentEditor
            height={100}
            name='address'
            initialValue={contentData[ContentKey.FooterAddress]}
          />
        </div>

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>
    </Card>
  );
};

export default EditFooterForm;
