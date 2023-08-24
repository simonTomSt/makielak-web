import dynamic from 'next/dynamic';
import { RowType } from '@/api';
import { getImageById } from '@/api/ssr';
import { getCategoryById } from '@/api/spa';

const EditProductForm = dynamic(() => import('./EditProductForm'), {
  ssr: true,
});
const ProductIemAccordion = dynamic(() => import('./ProductItemAccordion'), {
  ssr: true,
});

type ProductItemItemProps = {
  product: RowType<'products'>;
};

const ProductItem = async ({ product }: ProductItemItemProps) => {
  const productImage = await getImageById(product.image || '');
  const { data: productCategory } = await getCategoryById(
    product.category_id || ''
  );

  return (
    <ProductIemAccordion product={product}>
      <EditProductForm
        product={product}
        productImage={productImage}
        productCategory={productCategory}
      />
    </ProductIemAccordion>
  );
};

export default ProductItem;
