import type {
  GridSpanTab,
  GridSpanPC,
  GridStartTab,
  GridStartPC,
  GridOrder,
  GridRowTab,
  GridRowPC,
  GridRowSpanTab,
  GridRowSpanPC,
} from '@/lib/options/gridOptions';

type Props = {
  children: React.ReactNode;
  options?: Partial<{
    span: {
      tab: GridSpanTab;
      pc?: GridSpanPC;
    };
    start: {
      tab: GridStartTab;
      pc?: GridStartPC;
    };
    order: GridOrder;
    row: {
      tab?: GridRowTab;
      pc?: GridRowPC;
    };
    rowSpan: {
      tab?: GridRowSpanTab;
      pc?: GridRowSpanPC;
    };
  }>;
};

export default function BlockGroup({ children, options }: Props) {
  const classes = [
    'flex flex-col gap-6',
    options?.span?.tab,
    options?.span?.pc,
    options?.start?.tab,
    options?.start?.pc,
    options?.order,
    options?.row?.tab,
    options?.row?.pc,
    options?.rowSpan?.tab,
    options?.rowSpan?.pc,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
