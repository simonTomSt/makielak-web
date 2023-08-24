'use client';
import { useRouter } from 'next/navigation';
import {
  ContentEditor,
  Form,
  Button,
  Input,
  Typography,
  toast,
  Spinner,
} from '@/components';
import { useMutation } from '@/utils';
import { t } from '@/translations';
import { createCategory } from '@/api/spa';
import { RowType } from '@/api';
import { useState } from 'react';

type FormValues = Omit<
  RowType<'categories'>,
  'thumb_image' | 'background_image'
>;

const CreateCategoryForm = () => {
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

  const handleSave = (category: FormValues) => {
    mutate(() => createCategory(category));
  };

  if (!expanded) {
    return (
      <Button variant='outlined' onClick={() => setExpanded(true)}>
        {t.admin.edit.categories.add_new}
      </Button>
    );
  }

  return (
    <div className='mt-10 rounded-lg border border-blue-gray-100 px-4 bg-white py-4'>
      <Typography variant='h5' className='mb-1.5'>
        {t.admin.edit.categories.add_new}
      </Typography>
      <Form<FormValues> onSubmit={handleSave}>
        <Input label={t.admin.edit.home.services.item_title} name='name' />
        <br />
        <ContentEditor name='description' height={200} />

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;
