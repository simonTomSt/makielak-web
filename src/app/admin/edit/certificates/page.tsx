import { getAllCertificates } from '@/api/ssr';
import { Typography } from '@/components';
import { t } from '@/translations';
import EditCertificateItem from './EditCertificateItem';
import { CertificatesType } from '@/utils';
import dynamic from 'next/dynamic';

const CreateCertificateForm = dynamic(() => import('./CreateCertificateForm'), {
  ssr: true,
});

const EditCertificates = async () => {
  const { data: certificatesData } = await getAllCertificates();
  const certificates = certificatesData?.filter(
    (certificate) => certificate.type === CertificatesType.Certificates
  );
  const declarations = certificatesData?.filter(
    (certificate) => certificate.type === CertificatesType.Declarations
  );

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.certificates.title}
      </Typography>

      <Typography variant='h5' className='mb-5'>
        {t.admin.edit.certificates.edit_certificates}
      </Typography>
      {certificates?.map((certificate) => (
        <EditCertificateItem
          key={certificate.id}
          certificate={certificate}
          type={CertificatesType.Certificates}
        />
      ))}
      <CreateCertificateForm type={CertificatesType.Certificates} />

      <Typography variant='h5' className='mt-12 mb-5'>
        {t.admin.edit.certificates.edit_declarations}
      </Typography>
      {declarations?.map((certificate) => (
        <EditCertificateItem
          key={certificate.id}
          certificate={certificate}
          type={CertificatesType.Declarations}
        />
      ))}
      <CreateCertificateForm type={CertificatesType.Declarations} />
    </>
  );
};

export default EditCertificates;
