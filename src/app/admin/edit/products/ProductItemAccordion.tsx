'use client';
import { ReactNode, useState } from 'react';
import { RowType } from '@/api';
import { Accordion, AccordionBody, AccordionHeader } from '@/components';

type ProductItemAccordionProps = {
  children: ReactNode;
  product: RowType<'products'>;
};

const ProductItemAccordion = ({
  product,
  children,
}: ProductItemAccordionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      open={open}
      className='mb-2 rounded-lg border border-blue-gray-100 px-4 bg-white'
    >
      <AccordionHeader onClick={() => setOpen(!open)}>
        {product?.name || ''}
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </Accordion>
  );
};

export default ProductItemAccordion;
