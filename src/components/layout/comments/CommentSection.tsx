'use client';
import CommentSingle from '@/components/ui/comments/CommentSingle';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import { useAuthStore } from '@/providers/auth-provider';
import PageText from '@/components/ui/typography/PageText';
import CommentForm from './CommentForm';
import { useState } from 'react';

type Props = {
  comments: Array<SingleCommentType>;
  pageDetails: {
    collection: string;
    id: number;
  };
};

export default function CommentSection({ comments, pageDetails }: Props) {
  const { user } = useAuthStore((state) => state);
  const [commentList, setCommentList] = useState<Array<SingleCommentType>>(comments);

  const handleCommentListUpdate = (newComment: SingleCommentType) => {
    setCommentList((prevList) => [...prevList, newComment]);
  };

  return (
    <section className="bg-background bg-[url(/transparent-bg/paper-3.png)] bg-repeat bg-size[8.625rem] px-4 pt-3 pb-6 md:px-8 md:pb-8">
      <hr className="border-0 h-0.5 bg-heading w-full" />
      <p className="font-heading text-2xl text-heading font-bold mt-4 underline underline-offset-4">
        Character Comments
      </p>
      <ul className="flex flex-col">
        {commentList.map((single, index) => (
          <CommentSingle key={`comment-single-${index}`} comment={single} />
        ))}
      </ul>
      {user ? (
        <CommentForm pageDetails={pageDetails} handleCommentListUpdate={handleCommentListUpdate} />
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
