export const fileUrlLoader = (url: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/test/${url}`;
