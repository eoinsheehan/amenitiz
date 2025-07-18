import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CartItem from './CartItem'

describe('CartItem component', () => {
  it('renders code, cost, and quantity', () => {
    const mockItem = {
      name: 'Green tea',
      price: 25.5,
      quantity: 2
    }

    render(<CartItem item={mockItem} />)

    expect(screen.getByText(/green tea/i)).toBeInTheDocument()
    expect(screen.getByTestId('item-price')).toHaveTextContent('€25.5')
  })
})
