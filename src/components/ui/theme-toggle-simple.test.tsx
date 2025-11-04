import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeToggleSimple } from './theme-toggle-simple'

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    theme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ThemeToggleSimple', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
  })

  it('should render toggle button after mounting', async () => {
    render(<ThemeToggleSimple />)

    // Wait for component to mount (hydration fix)
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /cambiar tema/i })
      expect(button).toBeInTheDocument()
    })
  })

  it('should toggle theme on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggleSimple />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cambiar tema/i })).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: /cambiar tema/i })
    await user.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('should render without errors', () => {
    const { container } = render(<ThemeToggleSimple />)

    // Component should render a button
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })
})
