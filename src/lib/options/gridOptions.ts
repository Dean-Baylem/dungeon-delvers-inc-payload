export const gridOptions = {
  span: {
    tab: [
      'md:col-span-1',
      'md:col-span-2',
      'md:col-span-3',
      'md:col-span-4',
      'md:col-span-5',
      'md:col-span-6',
      'md:col-span-7',
      'md:col-span-8',
      'md:col-span-9',
      'md:col-span-10',
      'md:col-span-11',
      'md:col-span-12',
    ],
    pc: [
      'lg:col-span-1',
      'lg:col-span-2',
      'lg:col-span-3',
      'lg:col-span-4',
      'lg:col-span-5',
      'lg:col-span-6',
      'lg:col-span-7',
      'lg:col-span-8',
      'lg:col-span-9',
      'lg:col-span-10',
      'lg:col-span-11',
      'lg:col-span-12',
    ],
  },

  start: {
    tab: [
      'md:col-start-1',
      'md:col-start-2',
      'md:col-start-3',
      'md:col-start-4',
      'md:col-start-5',
      'md:col-start-6',
      'md:col-start-7',
      'md:col-start-8',
      'md:col-start-9',
      'md:col-start-10',
      'md:col-start-11',
      'md:col-start-12',
    ],
    pc: [
      'lg:col-start-1',
      'lg:col-start-2',
      'lg:col-start-3',
      'lg:col-start-4',
      'lg:col-start-5',
      'lg:col-start-6',
      'lg:col-start-7',
      'lg:col-start-8',
      'lg:col-start-9',
      'lg:col-start-10',
      'lg:col-start-11',
      'lg:col-start-12',
    ],
  },

  order: [
    'order-1',
    'order-2',
    'order-3',
    'order-4',
    'order-5',
    'order-6',
    'order-7',
    'order-8',
    'order-9',
    'order-10',
    'order-11',
    'order-12',
  ],

  row: {
    tab: ['md:row-start-1', 'md:row-start-2', 'md:row-start-3', 'md:row-start-4', 'md:row-start-5'],
    pc: ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3', 'lg:row-start-4', 'lg:row-start-5'],
  },

  rowSpan: {
    base: ['row-span-1', 'row-span-2', 'row-span-3', 'row-span-4', 'row-span-5'],
    tab: ['md:row-span-1', 'md:row-span-2', 'md:row-span-3', 'md:row-span-4', 'md:row-span-5'],
    pc: ['lg:row-span-1', 'lg:row-span-2', 'lg:row-span-3', 'lg:row-span-4', 'lg:row-span-5'],
  },
} as const;

export type GridSpanTab = (typeof gridOptions.span.tab)[number];
export type GridSpanPC = (typeof gridOptions.span.pc)[number];

export type GridStartTab = (typeof gridOptions.start.tab)[number];
export type GridStartPC = (typeof gridOptions.start.pc)[number];

export type GridOrder = (typeof gridOptions.order)[number];

export type GridRowTab = (typeof gridOptions.row.tab)[number];
export type GridRowPC = (typeof gridOptions.row.pc)[number];

export type GridRowSpanTab = (typeof gridOptions.rowSpan.tab)[number];
export type GridRowSpanPC = (typeof gridOptions.rowSpan.pc)[number];
