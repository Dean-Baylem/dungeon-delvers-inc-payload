'use client';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import { useState } from 'react';

type Props = {
  comment: SingleCommentType;
  handleCommentUpdate: (content: string) => void;
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
};

export default function CommentEditForm({
  comment,
  handleCommentUpdate,
  isLoading,
  setIsLoading,
}: Props) {
  const { textContent, commentId } = comment;
  const [value, setValue] = useState(textContent);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading && setIsLoading(true);
    const commentData = { commentId, textContent: value };

    try {
      const response = await fetch('/api/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error('Failed to update comment');

      handleCommentUpdate(String(value));
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('There was an error updating your comment. Please try again.');
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} id={`edit-form-${comment.commentId}`} className="relative">
        <textarea
          className={`bg-background p-2 border-heading border font-sans font-lg font-medium leading-relaxed w-full resize-y col-start-2 row-span-2 ${isLoading && 'opacity-50 pointer-events-none animate-pulse'}`}
          name="comment"
          cols={4}
          value={String(value)}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </form>
    </>
  );
}
