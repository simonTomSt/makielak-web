import logoIcon from '@/assets/images/logo/logo-gradient-dark.svg';
import Image from 'next/image';

interface Props {}

export const Logo = (props: Props) => {
  const {} = props;

  return <Image src={logoIcon} alt='makielak-kruszywa_logo' />;
};
