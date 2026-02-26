'use client';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { useAuthStore } from '@/providers/auth-provider';
import { SingleCommentType } from '@/types/comments/singleCommentType';

type Props = {
  pageDetails: {
    collection: string;
    id: number;
  };
  handleCommentListUpdate: (newComment: SingleCommentType) => void;
};

export default function CommentForm({ pageDetails, handleCommentListUpdate }: Props) {
  const { user } = useAuthStore((state) => state);
  if (!user) return;

  const { primary } = CTA_TYPES;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const commentText = formData.get('comment') as string;
    const data = {
      content: commentText,
      author: user.id,
      status: 'publish',
      parentPost: {
        relationTo: pageDetails.collection,
        value: pageDetails.id,
      },
      parentComment: null,
    };
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const newComment = await response.json();
      handleCommentListUpdate(newComment);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form
      className="mt-6 grid grid-cols-[1fr_11.25rem] grid-rows-[auto_1fr]"
      onSubmit={handleFormSubmit}
    >
      <textarea
        className="bg-background p-2 border-heading border font-sans font-lg font-medium leading-relaxed w-full resize-y col-start-1 row-span-2"
        name="comment"
        cols={4}
      ></textarea>
      <select>
        <option value="" disabled selected>
          Select a Character
        </option>
      </select>
      <button type="submit" className={`${primary} mt-2 col-start-2 row-start-2`}>
        Submit Comment
      </button>
    </form>
  );
}
