import { FieldHook } from 'payload';

const generateSortableDate: FieldHook = ({ data }) =>
  data?.startDateYear && data?.startDateMonth
    ? data.startDateYear * 100 + data.startDateMonth
    : undefined;

export default generateSortableDate;
