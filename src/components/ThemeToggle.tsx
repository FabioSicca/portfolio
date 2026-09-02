type Theme = 'light' | 'dark'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={onToggle}
    >
      <span aria-hidden="true">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle