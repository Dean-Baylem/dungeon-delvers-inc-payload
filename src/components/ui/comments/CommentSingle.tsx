'use client';
import Image from 'next/image';
import FormattedText from '../RichText/FormattedText';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import { useState } from 'react';
import { useAuthStore } from '@/providers/auth-provider';
import CommentEditForm from '@/components/layout/comments/CommentEditForm';

type Props = {
  comment: SingleCommentType;
  handleCommentDelete: (commentId: number) => void;
};

export default function CommentSingle({ comment, handleCommentDelete }: Props) {
  const { image, textContent, username, userId } = comment;
  const { user } = useAuthStore((state) => state);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(textContent);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentUpdate = (content: string) => {
    setText(content);
    setIsEdit(false);
  };

  const btnLoadStyle =
    'bg-slate-400 text-mainText border-mainText opacity-60 pointer-events-none animate-pulse';

  const confirmDelete = async () => {
    if (confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/comments', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commentId: comment.commentId }),
        });

        if (!response.ok) throw new Error('Failed to delete comment');
        handleCommentDelete(comment.commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('There was an error deleting your comment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
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
            className={`text-mainText text-sm font-bold font-sans pb-0.5 pt-1 px-1 h-fit leading-none self-center border duration-150 hover:bg-mainText cursor-pointer hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${isLoading ? btnLoadStyle : 'bg-background border-secondary'}`}
            onClick={() => setIsEdit((prev) => !prev)}
            type="button"
            disabled={isLoading}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
        )}
        {user && Number(user.id) === Number(userId) && isEdit && (
          <button
            className={`text-sm font-bold font-sans pb-0.5 pt-1 px-1 h-fit leading-none self-center border duration-150 cursor-pointer hover:bg-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${isLoading ? btnLoadStyle : 'bg-secondary text-white border-secondary'}`}
            type="submit"
            form={`edit-form-${comment.commentId}`}
            disabled={isLoading}
          >
            Save
          </button>
        )}
        {user && Number(user.id) === Number(userId) && !isEdit && (
          <button
            className={`text-sm font-bold font-sans pb-0.5 pt-1 px-1 h-fit leading-none self-center border duration-150 cursor-pointer hover:bg-danger-hover hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 ${isLoading ? btnLoadStyle : 'bg-danger text-white border-danger'}`}
            type="button"
            onClick={confirmDelete}
            disabled={isLoading}
          >
            Delete
          </button>
        )}
      </div>
      {isEdit ? (
        <CommentEditForm
          comment={{ ...comment, textContent: text }}
          handleCommentUpdate={(content: string) => {
            handleCommentUpdate(content);
          }}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      ) : (
        <FormattedText customClass="col-start-2">{text}</FormattedText>
      )}
    </li>
  );
}
