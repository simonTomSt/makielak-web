import { Button, ButtonProps } from '@material-tailwind/react';

type BrandColor = 'primary' | 'secondary';

type BrandButtonProps = ButtonProps & {
  brandColor?: BrandColor;
};

const brandColorStyles = new Map();
brandColorStyles.set('primary', 'bg-pink-to-purple text-white');
brandColorStyles.set('secondary', 'bg-pink-to-orange text-purple-dark');

export const BrandButton = ({
  brandColor,
  children,
  className,
  disabled,
  ...props
}: BrandButtonProps) => {
  return (
    <Button
      className={`
      ${brandColorStyles.get(brandColor)} 
      ${className}
      `}
      {...(props as any)}
    >
      {children}
    </Button>
  );
};
