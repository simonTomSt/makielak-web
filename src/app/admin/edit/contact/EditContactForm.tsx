'use client';

import { saveContent } from '@/api/spa';
import {
  Button,
  Card,
  ContentEditor,
  Form,
  Input,
  Spinner,
  Typography,
  toast,
} from '@/components';
import { t } from '@/translations';
import { ContentKey, useMutation } from '@/utils';

type EditContactFormProps = {
  contentData: Record<ContentKey, string>;
};

type FormValues = {
  welcome: string;
  email: string;
  phone1: string;
  phone2: string;
  address1: string;
  address1Name: string;
  address1Map: string;
  address2: string;
  address2Name: string;
  address2Map: string;
};

const EditContactForm = ({ contentData }: EditContactFormProps) => {
  const { mutate, loading } = useMutation({
    onSuccess: () => toast.success(t.admin.edit.saved_successfully),
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const handleSave = ({
    welcome,
    email,
    phone1,
    phone2,
    address1,
    address1Name,
    address1Map,
    address2,
    address2Name,
    address2Map,
  }: FormValues) => {
    mutate(() =>
      Promise.all([
        saveContent(ContentKey.Contact, welcome),
        saveContent(ContentKey.ContactEmail, email),
        saveContent(ContentKey.ContactPhone1, phone1),
        saveContent(ContentKey.ContactPhone2, phone2),
        saveContent(ContentKey.ContactAddress1, address1),
        saveContent(ContentKey.ContactAddress1Name, address1Name),
        saveContent(ContentKey.ContactAddress1Map, address1Map),
        saveContent(ContentKey.ContactAddress2, address2),
        saveContent(ContentKey.ContactAddress2Name, address2Name),
        saveContent(ContentKey.ContactAddress2Map, address2Map),
      ])
    );
  };

  return (
    <Card className='p-5 mb-5'>
      <Form<FormValues> onSubmit={handleSave}>
        <div className='my-4'>
          <Typography variant='h6' className='mb-1'>
            {t.admin.edit.contact.edit_desc}
          </Typography>
          <ContentEditor
            height={250}
            name='welcome'
            initialValue={contentData[ContentKey.Contact]}
          />
        </div>

        <div className='my-8'>
          <Typography variant='h6' className='mb-1.5'>
            {t.admin.edit.contact.edit_email}
          </Typography>
          <Input
            label='Email'
            name='email'
            defaultValue={contentData[ContentKey.ContactEmail]}
          />
        </div>

        <div className='mt-8 mb-3'>
          <Typography variant='h6' className='mb-1.5'>
            {t.admin.edit.contact.phone1}
          </Typography>
          <Input
            label={t.admin.edit.contact.phone1}
            name='phone1'
            defaultValue={contentData[ContentKey.ContactPhone1]}
          />
        </div>

        <div className='mb-8'>
          <Typography variant='h6' className='mb-1.5'>
            {t.admin.edit.contact.phone2}
          </Typography>
          <Input
            label={t.admin.edit.contact.phone2}
            name='phone2'
            defaultValue={contentData[ContentKey.ContactPhone2]}
          />
        </div>

        <div className='my-8'>
          <Typography variant='h6' className='mb-1.5'>
            {t.admin.edit.contact.address1_title}
          </Typography>
          <div className='mb-2'>
            <Input
              label={t.admin.edit.contact.address_name}
              name='address1Name'
              defaultValue={contentData[ContentKey.ContactAddress1Name]}
            />
          </div>
          <div className='mb-2'>
            <Input
              label={t.admin.edit.contact.address}
              name='address1'
              defaultValue={contentData[ContentKey.ContactAddress1]}
            />
          </div>
          <div>
            <Input
              label={t.admin.edit.contact.address_map}
              name='address1Map'
              defaultValue={contentData[ContentKey.ContactAddress1Map]}
              className='mb-1.5'
            />
          </div>
        </div>

        <div className='my-8'>
          <Typography variant='h6' className='mb-1.5'>
            {t.admin.edit.contact.address2_title}
          </Typography>
          <div className='mb-2'>
            <Input
              label={t.admin.edit.contact.address_name}
              name='address2Name'
              defaultValue={contentData[ContentKey.ContactAddress2Name]}
            />
          </div>
          <div className='mb-2'>
            <Input
              label={t.admin.edit.contact.address}
              name='address2'
              defaultValue={contentData[ContentKey.ContactAddress2]}
            />
          </div>
          <div>
            <Input
              label={t.admin.edit.contact.address_map}
              name='address2Map'
              defaultValue={contentData[ContentKey.ContactAddress2Map]}
              className='mb-1.5'
            />
          </div>
        </div>

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>
    </Card>
  );
};

export default EditContactForm;
