'use client';

import { SingleCommentType } from '@/types/comments/singleCommentType';

type Props = {
  comment: SingleCommentType;
  handleCommentUpdate: (updatedComment: SingleCommentType) => void;
};

export default function CommentEditForm({ comment }: Props) {
  const { textContent, username, userId, commentId } = comment;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Saving edited comment...');
    console.log('Comment ID:', commentId);
    // Implement the logic to save the edited comment here
    // This could involve making an API call to update the comment in the database
    // handleCommentUpdate(updatedComment);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} id={`edit-form-${comment.commentId}`}>
        <textarea
          className="bg-background p-2 border-heading border font-sans font-lg font-medium leading-relaxed w-full resize-y col-start-2 row-span-2"
          name="comment"
          cols={4}
          defaultValue={String(textContent)}
        ></textarea>
      </form>
    </>
  );
}
