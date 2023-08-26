import { RowType } from '@/api';
import { getImageById } from '@/api/ssr';
import CertificateItemAccordion from './CertificateItemAccordion';
import dynamic from 'next/dynamic';
import { CertificatesType } from '@/utils';

const EditCertificateForm = dynamic(() => import('./EditCertificateForm'), {
  ssr: true,
});

type EditCertificateItemProps = {
  certificate: RowType<'certificates'>;
  type: CertificatesType;
};

const EditCertificateItem = async ({
  certificate,
  type,
}: EditCertificateItemProps) => {
  const thumbImage = await getImageById(certificate.image || '');

  return (
    <CertificateItemAccordion name={certificate?.name || ''}>
      <EditCertificateForm
        certificate={certificate}
        thumbImage={thumbImage}
        type={type}
      />
    </CertificateItemAccordion>
  );
};

export default EditCertificateItem;
