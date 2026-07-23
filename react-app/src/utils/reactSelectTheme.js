// Shared react-select `styles` config so every dropdown in the app (board
// switcher, workspace picker, priority picker, member picker) matches the
// rest of the theme — including dark mode, since these resolve CSS custom
// properties at paint time just like regular CSS.
export const selectTheme = {
  control: (base, state) => ({
    ...base,
    minHeight: '38px',
    backgroundColor: 'var(--surface-card)',
    borderColor: state.isFocused ? 'var(--brand-indigo-400)' : 'var(--surface-border)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(99,102,241,.15)' : 'none',
    '&:hover': { borderColor: 'var(--brand-indigo-300)' },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--surface-card)',
    border: '1px solid var(--surface-border)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    zIndex: 20,
  }),
  menuList: (base) => ({ ...base, backgroundColor: 'var(--surface-card)' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'var(--brand-indigo-500)'
      : state.isFocused
      ? 'var(--surface-sunken)'
      : 'transparent',
    color: state.isSelected ? '#fff' : 'var(--text-primary)',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({ ...base, color: 'var(--text-primary)' }),
  placeholder: (base) => ({ ...base, color: 'var(--text-muted)' }),
  input: (base) => ({ ...base, color: 'var(--text-primary)' }),
  indicatorSeparator: (base) => ({ ...base, backgroundColor: 'var(--surface-border)' }),
  dropdownIndicator: (base) => ({ ...base, color: 'var(--text-muted)' }),
  multiValue: (base) => ({ ...base, backgroundColor: 'var(--brand-indigo-50)' }),
  multiValueLabel: (base) => ({ ...base, color: 'var(--brand-indigo-700)' }),
};
