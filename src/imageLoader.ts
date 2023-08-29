import { ImageLoader } from 'next/image';

const supabaseLoader: ImageLoader = ({ src, width, quality }) => {
  return `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/test/${src}?width=${width}&quality=${
    quality || 75
  }`;
};

export default supabaseLoader;
