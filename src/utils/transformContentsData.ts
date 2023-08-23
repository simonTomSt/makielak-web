import { RowType } from '@/api';
import { ContentImagesKey, ContentKey } from './content-keys';

export const getContent = (
  contentData: RowType<'content'>[],
  contentKey: ContentKey
) => {
  return contentData?.find(({ key }) => key === contentKey)?.content || '';
};

export const transformContentsData = (
  contentData: RowType<'content'>[] | null
): Record<ContentKey, string> =>
  contentData?.reduce((acc, contentRecord) => {
    if (!contentRecord?.key) return acc;

    (acc as any)[contentRecord.key] = contentRecord.content;
    return acc;
  }, {}) as Record<ContentKey, string>;

export const transformContentImagesData = (
  contentData: RowType<'content_images'>[] | null
): Record<ContentImagesKey, string> =>
  contentData?.reduce((acc, contentRecord) => {
    if (!contentRecord?.key) return acc;

    (acc as any)[contentRecord.key] = contentRecord.image;
    return acc;
  }, {}) as Record<ContentKey, string>;
