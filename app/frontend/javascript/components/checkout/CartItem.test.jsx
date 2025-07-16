import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CartItem from './CartItem'

describe('CartItem component', () => {
  it('renders code, cost, and quantity', () => {
    const mockItem = {
      code: 'ABC123',
      price: 25.5,
      quantity: 2
    }

    render(<CartItem item={mockItem} />)

    expect(screen.getByText(/code: abc123/i)).toBeInTheDocument()
    expect(screen.getByText(/\$25.5/)).toBeInTheDocument()
  })
})
