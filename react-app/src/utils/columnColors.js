// Assigns each board column a visual accent: matched by common status
// wording first (so the app's own default "To Do / In Progress / Completed"
// columns get a meaningful color), falling back to a rotating palette by
// column position so any custom column name still gets a distinct, stable
// color. Returns a CSS class suffix consumed by theme.css's
// `.column-accent-*` / `.task[class*="column-accent-"]` rules.
const PALETTE = ['blue', 'amber', 'emerald', 'violet', 'pink', 'slate'];

export const getColumnAccentKey = (column, index = 0) => {
  const name = (column?.name || '').toLowerCase();
  if (/done|complete|finished/.test(name)) return 'emerald';
  if (/progress|doing|review|testing/.test(name)) return 'amber';
  if (/todo|to do|backlog|queue|pending/.test(name)) return 'slate';
  return PALETTE[index % PALETTE.length];
};

export const getColumnAccentClass = (column, index = 0) =>
  'column-accent-' + getColumnAccentKey(column, index);
