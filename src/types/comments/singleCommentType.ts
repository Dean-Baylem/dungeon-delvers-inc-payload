export type SingleCommentType = {
  image?: {
    src: string;
    alt: string;
  };
  textContent: React.ReactNode;
  username: string;
  userId: number;
  commentId: number;
};
