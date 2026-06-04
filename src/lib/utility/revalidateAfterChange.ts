import { revalidatePath } from 'next/cache';

export const revalidateAfterChange = (collection: string, slug: string, prevSlug: string) => {
  revalidatePath('/');
  revalidatePath(`/${collection}`);
  revalidatePath(`/${collection}/${slug}`);
  if (prevSlug && prevSlug !== slug) {
    revalidatePath(`/${collection}/${prevSlug}`);
  }
};
