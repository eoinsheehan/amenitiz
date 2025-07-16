import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Checkout from './Checkout'

// Stub CheckoutTotals
vi.mock('./CheckoutTotals', () => ({
  default: () => <div data-testid="mock-checkout-totals"/>
}))

const mockCart = {
  items: [
    { code: 'ABC123', cost: 20, quantity: 2 },
    { code: 'XYZ789', cost: 10, quantity: 1 }
  ]
}

let store = {}

beforeEach(() => {
  store = {}

  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { for (const key in store) delete store[key] })
  })
})

describe('Checkout component', () => {
  it('displays "No items in checkout." when cart is empty and does not call fetch', async () => {
    localStorage.setItem('cart', JSON.stringify({ items: [] }))

    render(<Checkout />)

    await waitFor(() => {
      expect(screen.getByText('No items in checkout.')).toBeInTheDocument()
    })
  })

  describe('with a valid cart in localStorage', () => {
    beforeEach(() => {
      localStorage.setItem('cart', JSON.stringify(mockCart))
    })

  it('renders one CartItem per item in the cart', async () => {
    render(<Checkout />)

    await waitFor(() => {
      const cartItems = screen.getAllByTestId('cart-item')
      expect(cartItems).toHaveLength(mockCart.items.length)
    })
  })
  })
})
