import React from 'react';

type Props = {
  list: Array<{ title: string; text: string }>;
};

export default function InfoBoxList({ list }: Props) {
  return (
    <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 p-4 w-fit m-0">
      {list.map((item, index) => (
        <React.Fragment key={`infobox-list-item-${item.title}-${index}`}>
          <dt className="font-serif font-bold text-mainText capitalize">{item.title}</dt>
          <dd
            className="font-serif text-mainText whitespace-pre-wrap capitalize"
            dangerouslySetInnerHTML={{ __html: item.text }}
          ></dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
