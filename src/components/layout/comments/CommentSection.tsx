'use client';
import CommentSingle from '@/components/ui/comments/CommentSingle';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { useAuthStore } from '@/providers/auth-provider';
import PageText from '@/components/ui/typography/PageText';

type Props = {
  comments: Array<SingleCommentType>;
};

export default function CommentSection({ comments }: Props) {
  const { user } = useAuthStore((state) => state);
  const { primary } = CTA_TYPES;

  return (
    <section className="bg-background bg-[url(/transparent-bg/paper-3.png)] bg-repeat bg-size[8.625rem] px-4 pt-3 pb-6 md:px-8 md:pb-8">
      <hr className="border-0 h-0.5 bg-heading w-full" />
      <p className="font-heading text-2xl text-heading font-bold mt-4 underline underline-offset-4">
        Comments
      </p>
      <ul className="flex flex-col">
        {comments.map((single, index) => (
          <CommentSingle key={`comment-single-${index}`} comment={single} />
        ))}
      </ul>
      {user ? (
        <form className="mt-6">
          <div>
            <textarea
              className="bg-background p-2 border-heading border font-sans font-lg font-medium leading-relaxed w-full resize-y"
              cols={4}
            ></textarea>
            <button type="submit" className={`${primary} mt-2`}>
              Submit Comment
            </button>
          </div>
        </form>
      ) : (
        <div>
          <PageText customClasses="text-xl mt-4 text-center font-bold">
            Login to leave comments
          </PageText>
        </div>
      )}
    </section>
  );
}
