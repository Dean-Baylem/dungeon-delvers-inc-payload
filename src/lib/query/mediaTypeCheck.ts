import { Media } from '@/payload-types';

export default function mediaTypeCheck(media?: number | Media | null) {
  if (!media || typeof media === 'number') {
    return {
      src: '',
      alt: '',
    };
  }

  return {
    src: media.url ?? '',
    alt: media.alt ?? '',
  };
}
