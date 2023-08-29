import logoDefaultIcon from '@/assets/images/logo/logo-gradient-dark.svg';
import logoPinkIcon from '@/assets/images/logo/logo-secondary.svg';
import Image from 'next/image';

type LogoVariants = 'default' | 'pink';
type LogoSizes = 'm' | 'l' | 's';

type LogoProps = {
  variant?: LogoVariants;
  size?: LogoSizes;
};

const iconMap = new Map([
  ['default', logoDefaultIcon],
  ['pink', logoPinkIcon],
]);

const widthMap = new Map([
  ['s', 'max-w-[80px]'],
  ['m', 'max-w-[100px]'],
  ['l', 'max-w-[140px]'],
]);

export const Logo = ({ variant = 'default', size = 'm' }: LogoProps) => {
  const logoIcon = iconMap.get(variant);
  const sizeStyles = widthMap.get(size);

  return (
    <Image
      src={logoIcon}
      alt='makielak kruszywa logo'
      className={`${sizeStyles}`}
    />
  );
};
