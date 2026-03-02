'use client';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { useAuthStore } from '@/providers/auth-provider';
import { SingleCommentType } from '@/types/comments/singleCommentType';
import { useState, useEffect } from 'react';

type Props = {
  pageDetails: {
    collection: string;
    id: number;
  };
  handleCommentListUpdate: (newComment: SingleCommentType) => void;
};

export default function CommentForm({ pageDetails, handleCommentListUpdate }: Props) {
  const { user } = useAuthStore((state) => state);
  const [characters, setCharacters] = useState<Array<{ id: string; name: string }>>([]);

  if (!user) return;

  const { primary } = CTA_TYPES;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('/api/characters/get-for-player', {
          method: 'GET',
        });
        const data = await res.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const commentText = formData.get('comment') as string;
    const characterId = formData.get('character') as string;

    console.log(characterId);

    if (!characterId) {
      alert('Please select a character to comment with.');
      return;
    }

    const data = {
      content: commentText,
      author: user.id,
      status: 'publish',
      parentPost: {
        relationTo: pageDetails.collection,
        value: pageDetails.id,
      },
      parentComment: null,
      character: parseInt(characterId),
    };

    console.log(data.character);

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
      alert('There was an error submitting your comment. Please try again.');
    }
  };

  return (
    <form
      className="mt-6 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-4 gap-y-3"
      onSubmit={handleFormSubmit}
    >
      <textarea
        className="bg-background p-2 border-heading border font-sans font-lg font-medium leading-relaxed w-full resize-y col-start-2 row-span-2"
        name="comment"
        cols={4}
      ></textarea>
      <div className="col-start-1 row-start-1">
        <select
          name="character"
          defaultValue=""
          className="bg-background w-full p-2 font-medium font-sans border border-heading"
        >
          <option value="">Select a Character</option>
          {characters.map((char) => (
            <option key={`char-${char.id}`} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={`${primary} col-start-1 row-start-2`}>
        Submit Comment
      </button>
    </form>
  );
}
