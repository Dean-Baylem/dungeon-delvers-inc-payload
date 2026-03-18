'use client';
import ReactMarkdown from 'react-markdown';
import PageSection from '@/components/layout/page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import { gridOptions } from '@/lib/options/gridOptions';
import { useState } from 'react';
import { CTA_TYPES } from '@/constants/ctaTypes';
import MDEditor from '@uiw/react-md-editor';
import { useAuthStore } from '@/providers/auth-provider';

export default function CharacterPrivateSection({
  privateContents,
  characterId,
  charPath,
}: {
  privateContents: string;
  characterId: number;
  charPath: string;
}) {
  const { user } = useAuthStore((state) => state);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(privateContents);
  const [editedContent, setEditedContent] = useState(privateContents);
  const { primary, secondary } = CTA_TYPES;

  const handleEditClick = () => {
    if (isEdit && confirm('Are you sure you want to cancel editing?')) {
      setIsEdit(false);
      setEditedContent(content);
    } else {
      setIsEdit(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/characters/update-content', {
        method: 'PATCH',
        body: JSON.stringify({ content: editedContent, characterId, charPath, type: 'private' }),
      });

      if (!response.ok) throw new Error('Failed to update content');

      setContent(editedContent);
    } catch (error) {
      console.error('Error updating content:', error);
      alert('There was an error updating your content. Please try again.');
    } finally {
      setIsEdit(false);
    }
  };

  if (!user) return <></>;

  return (
    <PageSection title="Private Content">
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
          row: { tab: gridOptions.row.tab[0], pc: gridOptions.row.pc[0] },
          rowSpan: { tab: gridOptions.rowSpan.tab[1], pc: gridOptions.rowSpan.pc[1] },
        }}
      >
        {isEdit ? (
          <form onSubmit={handleFormSubmit} className="container">
            <MDEditor value={editedContent} onChange={(value) => setEditedContent(value ?? '')} />
            <div className="flex gap-4 mt-6">
              <button className={secondary} onClick={() => handleEditClick()} type="button">
                Cancel
              </button>
              <button className={primary} type="submit">
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="richTextContent">
              <ReactMarkdown>{`${content ? content : 'No Recorded Content'}`}</ReactMarkdown>
            </div>
            <div className="flex">
              <button className={primary} onClick={() => handleEditClick()}>
                Edit
              </button>
            </div>
          </>
        )}
      </BlockGroup>
    </PageSection>
  );
}
