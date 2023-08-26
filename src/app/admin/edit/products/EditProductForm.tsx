'use client';
import { useRouter } from 'next/navigation';
import {
  ContentEditor,
  Form,
  Button,
  Input,
  ImageUpload,
  Typography,
  toast,
  Spinner,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@/components';
import { useMutation } from '@/utils';
import { t } from '@/translations';
import { deleteProduct, saveProductImage, updateProduct } from '@/api/spa';
import { RowType } from '@/api';
import { useState } from 'react';
import { SelectCategoryModal } from '../categories/SelectCategoryModal';
import { useCategoriesContext } from '@/utils/CategoriesContext';

type EditProductFormProps = {
  product: RowType<'products'>;
  productCategory: RowType<'categories'> | null;
  productImage?: RowType<'images'> | null;
};

type FormValues = Omit<RowType<'products'>, 'image' | 'id'>;

const EditProductForm = ({
  product,
  productImage,
  productCategory,
}: EditProductFormProps) => {
  const router = useRouter();
  const { categories } = useCategoriesContext();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState<RowType<'categories'>>();

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
    mutate(() =>
      updateProduct({
        id: product.id,
        ...formCategory,
        category_id: category?.id || null,
      })
    );
  };

  const handleThumbImageUpload = (uploadedImage: RowType<'images'>) => {
    mutate(() => saveProductImage(product.id, uploadedImage));
  };

  const handleDelete = () => {
    deleteMutate(() => deleteProduct(product.id));
  };

  return (
    <div className='mb-1'>
      <Typography variant='h6' className='mb-2'>
        {t.admin.edit.products.edit_product}
      </Typography>
      <Form<FormValues> onSubmit={handleSave}>
        <Input
          label={t.admin.edit.products.edit_title}
          name='name'
          defaultValue={product.name || ''}
        />
        <br />

        <Typography>{t.admin.edit.products.edit_desc}</Typography>
        <ContentEditor
          name='description'
          initialValue={product.description || ''}
          height={300}
        />

        <div className='flex justify-between'>
          <ImageUpload
            label={t.admin.edit.products.edit_thumbnail}
            initialImage={productImage?.url || undefined}
            onFileSelect={handleThumbImageUpload}
          />
        </div>

        <div className='flex items-center'>
          <Button
            type='button'
            size='sm'
            className='my-4 mr-4'
            variant='outlined'
            disabled={loading}
            onClick={() => setIsCategoryModalOpen(true)}
          >
            {t.admin.edit.products.select_category}
          </Button>

          {(category || productCategory) && (
            <Typography>
              {t.admin.edit.products.selected_category.replace(
                '{categoryName}',
                `${category?.name || productCategory?.name}`
              )}
            </Typography>
          )}
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
          {t.admin.edit.products.delete_product}
        </Button>
      </div>

      <Dialog open={isDeleteOpen} handler={setIsDeleteOpen}>
        <DialogHeader>
          {t.admin.edit.products.delete_product_confirmation}
        </DialogHeader>
        <DialogBody>
          {t.admin.edit.products.delete_product_confirmation_body}
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            onClick={() => setIsDeleteOpen(false)}
            className='mr-1'
          >
            <span>{t.admin.edit.products.no_keep}</span>
          </Button>
          <Button
            variant='text'
            color='red'
            disabled={deleteLoading}
            onClick={handleDelete}
          >
            <span>{t.admin.edit.products.yes_delete}</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <SelectCategoryModal
        categories={categories}
        open={isCategoryModalOpen}
        handler={setIsCategoryModalOpen}
        onCategorySelect={(category) => setCategory(category)}
      />
    </div>
  );
};

export default EditProductForm;
