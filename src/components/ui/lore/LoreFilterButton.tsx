'use client';

type Props = {
  subtype?: { label: string; value: string };
  handleFilterClick: (newSubtype: string) => void;
  querySubtypes: string;
};

export default function LoreFilterButton({ subtype, handleFilterClick, querySubtypes }: Props) {
  const isSelected =
    querySubtypes.length === 0 && subtype === undefined
      ? true
      : subtype !== undefined
        ? querySubtypes.includes(subtype.value)
        : false;
  const selectedClass = 'bg-secondary text-white';
  const unselectedClass = 'bg-background text-mainText hover:bg-mainText hover:text-white';

  return (
    <button
      role="tab"
      type="button"
      aria-selected={false}
      aria-controls="lore-card-list"
      id={`filterButton-${subtype === undefined ? 'all' : subtype.value}`}
      className={`${isSelected ? selectedClass : unselectedClass} py-1 px-4 lg
      
      :text-lg font-bold font-sans rounded border border-secondary duration-150 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 cursor-pointer`}
      onClick={() => {
        handleFilterClick(subtype === undefined ? 'all' : subtype.value);
      }}
    >
      {subtype === undefined ? 'All' : subtype.label}
    </button>
  );
}
