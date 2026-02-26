import Image from 'next/image';
import FormattedText from '../RichText/FormattedText';
import React from 'react';
import { SingleCommentType } from '@/types/comments/singleCommentType';

type Props = {
  comment: SingleCommentType;
};

export default function CommentSingle({ comment }: Props) {
  const { image, textContent, username } = comment;

  return (
    <li className="grid grid-cols-[3.125rem_1fr] gap-x-4 gap-y-0.5 py-4 border-b border-border">
      <div className="col-start-1 row-span-2 mt-2">
        <Image src={image.src} alt={image.alt} width="50" height="50" loading="lazy" />
      </div>
      <div className="col-start-2">
        <p className="font-bold font-heading text-2xl text-heading capitalize">{username}</p>
      </div>
      <FormattedText customClass="col-start-2">{textContent}</FormattedText>
    </li>
  );
}
