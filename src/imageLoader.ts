type ImageLoaderProps = {
  src: string;
  width: string | number;
  quality: string | number;
};

export default function supabaseLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/test/${src}?width=${width}&quality=${
    quality || 75
  }`;
}
