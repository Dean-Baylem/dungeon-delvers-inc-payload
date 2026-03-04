'use client';
import Image from 'next/image';
import FormattedText from '../RichText/FormattedText';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import { useState } from 'react';
import { useAuthStore } from '@/providers/auth-provider';
import CommentEditForm from '@/components/layout/comments/CommentEditForm';

type Props = {
  comment: SingleCommentType;
};

export default function CommentSingle({ comment }: Props) {
  const { image, textContent, username, userId } = comment;
  const { user } = useAuthStore((state) => state);
  const [isEdit, setIsEdit] = useState(false);

  const handleSaveComment = async () => {
    console.log('Saving comment...');
    // Implement the logic to save the edited comment here
    // This could involve making an API call to update the comment in the database
    // After saving, you might want to set isEdit back to false
    setIsEdit(false);
  };

  return (
    <li className="grid grid-cols-[3.125rem_1fr] gap-x-4 gap-y-0.5 py-4 border-b border-border">
      <div className="col-start-1 row-span-2 mt-2">
        {image && <Image src={image.src} alt={image.alt} width="50" height="50" loading="lazy" />}
      </div>
      <div className="col-start-2 flex gap-3">
        <p className="font-bold font-heading text-2xl text-heading capitalize">{username}</p>
        {user && Number(user.id) === Number(userId) && (
          <button
            className={`text-mainText text-sm font-bold font-sans bg-background pb-0.5 pt-1 px-1 h-fit leading-none self-center border border-secondary duration-150 hover:bg-mainText cursor-pointer hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}
            onClick={() => setIsEdit((prev) => !prev)}
            type="button"
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
        )}
        {user && Number(user.id) === Number(userId) && isEdit && (
          <button
            className={`text-white text-sm font-bold font-sans bg-secondary pb-0.5 pt-1 px-1 h-fit leading-none self-center border border-secondary duration-150 cursor-pointer hover:bg-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}
            type="submit"
            form={`edit-form-${comment.commentId}`}
          >
            Save
          </button>
        )}
      </div>
      {isEdit ? (
        <CommentEditForm comment={comment} handleCommentUpdate={() => {}} />
      ) : (
        <FormattedText customClass="col-start-2">{textContent}</FormattedText>
      )}
    </li>
  );
}
