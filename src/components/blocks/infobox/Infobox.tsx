import React from 'react';

type Props = {
  groups: Array<{ title: string; content: React.ReactNode }>;
};

export default function InfoBox({ groups }: Props) {
  return (
    <aside className="shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] border-heading border w-fit ml-auto">
      <dl className="flex flex-col max-w-[20rem] bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size[60px]">
        {groups.map((group, index) => (
          <React.Fragment key={`infobox-group-${group.title}-${index}`}>
            <dt className="font-subheading text-white text-center bg-heading py-2 px-4">
              {group.title}
            </dt>
            <dd>{group.content}</dd>
          </React.Fragment>
        ))}
      </dl>
    </aside>
  );
}
