export const truncate = (text: string, max = 150) =>
  text.length > max ? text.slice(0, max) + '…' : text;
