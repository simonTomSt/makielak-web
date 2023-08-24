'use client';
import { useRouter } from 'next/navigation';
import {
  ContentEditor,
  Form,
  Button,
  Input,
  FileUpload,
  Typography,
  toast,
  Spinner,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Checkbox,
} from '@/components';
import { useMutation } from '@/utils';
import { t } from '@/translations';
import {
  deleteCategory,
  saveCategoryThumbImage,
  updateCategory,
} from '@/api/spa';
import { RowType } from '@/api';
import { useId, useState } from 'react';

type EditCategoryFormProps = {
  category: RowType<'categories'>;
  categoryThumbImage?: RowType<'images'> | null;
};

type FormValues = Omit<
  RowType<'categories'>,
  'thumb_image' | 'background_image' | 'id'
>;

const EditCategoryForm = ({
  category,
  categoryThumbImage,
}: EditCategoryFormProps) => {
  const homePageCheckboxID = useId();
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

  const handleSave = (formCategory: FormValues) => {
    mutate(() => updateCategory({ id: category.id, ...formCategory }));
  };

  const handleThumbImageUpload = (uploadedImage: RowType<'images'>) => {
    mutate(() => saveCategoryThumbImage(category.id, uploadedImage));
  };

  const handleDelete = () => {
    deleteMutate(() => deleteCategory(category.id));
  };

  return (
    <div className='mb-1'>
      <Typography variant='h6' className='mb-2'>
        {t.admin.edit.categories.edit_category}
      </Typography>
      <Form<FormValues> onSubmit={handleSave}>
        <Input
          label={t.admin.edit.categories.edit_title}
          name='name'
          defaultValue={category.name || ''}
        />
        <br />

        <Typography>{t.admin.edit.categories.edit_desc}</Typography>
        <ContentEditor
          name='description'
          initialValue={category.description || ''}
          height={100}
        />

        <div className='mt-3'>
          <Checkbox
            id={homePageCheckboxID}
            label={
              <Typography variant='h6'>
                {t.admin.edit.categories.edit_on_homepage}
              </Typography>
            }
            ripple={true}
            name='on_home'
            defaultChecked={!!category.on_home}
          />

          <FileUpload
            label={t.admin.edit.categories.edit_thumbnail}
            initialImage={categoryThumbImage?.url || undefined}
            onFileSelect={handleThumbImageUpload}
          />
        </div>

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>

      <div className='flex justify-end'>
        <Button
          type='button'
          size='sm'
          className='mt-5'
          color='red'
          variant='outlined'
          onClick={() => setIsDeleteOpen(true)}
        >
          {t.admin.edit.categories.delete_category}
        </Button>
      </div>

      <Dialog open={isDeleteOpen} handler={setIsDeleteOpen}>
        <DialogHeader>
          {t.admin.edit.categories.delete_category_confirmation}
        </DialogHeader>
        <DialogBody>
          {t.admin.edit.categories.delete_category_confirmation_body}
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            onClick={() => setIsDeleteOpen(false)}
            className='mr-1'
          >
            <span>{t.admin.edit.categories.no_keep}</span>
          </Button>
          <Button
            variant='text'
            color='red'
            disabled={deleteLoading}
            onClick={handleDelete}
          >
            <span>{t.admin.edit.categories.yes_delete}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EditCategoryForm;
