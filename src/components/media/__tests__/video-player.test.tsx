import { render, screen } from '@testing-library/react'
import { VideoPlayer } from '../video-player'

describe('VideoPlayer', () => {
  it('renders YouTube iframe with correct video ID', () => {
    render(<VideoPlayer videoId="dQw4w9WgXcQ" title="Test Video" />)
    const iframe = screen.getByTitle('Test Video')
    expect(iframe).toHaveAttribute('src', expect.stringContaining('dQw4w9WgXcQ'))
  })

  it('applies autoplay parameter when enabled', () => {
    render(<VideoPlayer videoId="test123" autoplay={true} />)
    const iframe = screen.getByTitle('Video')
    expect(iframe).toHaveAttribute('src', expect.stringContaining('autoplay=1'))
  })

  it('applies muted parameter when enabled', () => {
    render(<VideoPlayer videoId="test123" muted={true} />)
    const iframe = screen.getByTitle('Video')
    expect(iframe).toHaveAttribute('src', expect.stringContaining('mute=1'))
  })

  it('applies loop parameter when enabled', () => {
    render(<VideoPlayer videoId="test123" loop={true} />)
    const iframe = screen.getByTitle('Video')
    const src = iframe.getAttribute('src')
    expect(src).toContain('loop=1')
    expect(src).toContain('playlist=test123')
  })

  it('applies controls parameter when disabled', () => {
    render(<VideoPlayer videoId="test123" controls={false} />)
    const iframe = screen.getByTitle('Video')
    expect(iframe).toHaveAttribute('src', expect.stringContaining('controls=0'))
  })

  it('applies custom className', () => {
    const { container } = render(<VideoPlayer videoId="test123" className="custom-class" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('custom-class')
  })

  it('has correct aspect ratio class', () => {
    const { container } = render(<VideoPlayer videoId="test123" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('aspect-video')
  })
})
