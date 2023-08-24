import dynamic from 'next/dynamic';
import { getAllCategories, getAllProducts } from '@/api/ssr';
import { Typography } from '@/components';
import { t } from '@/translations';

import ProductItem from './ProductItem';
import { CategoriesProvider } from '@/utils/CategoriesContext';

const CreateProductForm = dynamic(() => import('./CreateProductForm'), {
  ssr: true,
});

const EditProducts = async () => {
  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();

  return (
    <CategoriesProvider categories={categories || []}>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.products.title}
      </Typography>

      {products?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      <CreateProductForm />
    </CategoriesProvider>
  );
};

export default EditProducts;
