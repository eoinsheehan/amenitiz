import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import QuantityAdjuster from './QuantityAdjuster'

const mockProduct = {
  name: 'Green tea',
  price: '25',
  description: 'Green tea is good for your health',
  code: 'GT1'
}

describe('Product component (with QuantityAdjuster)', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    localStorage.clear()

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct)
      })
    )
  })

  it('increases amount when clicking Add button', async () => {
    render(
      <QuantityAdjuster product={mockProduct} />
    )

    expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')

    const increaseButton = screen.getByTestId('add-item')
    fireEvent.click(increaseButton)

    await waitFor(() => {
      expect(screen.getByTestId('item-quantity')).toHaveTextContent('1')
    })
  })

  it('retains amount at zero when Subtract is clicked with nothing in cart', async () => {
    render(
      <QuantityAdjuster product={mockProduct} />
    )

    expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')

    const subtractButton = screen.getByTestId('remove-item')
    fireEvent.click(subtractButton)

    await waitFor(() => {
      expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')
    })
  })

  it('decreases amount from 1 to 0 when Subtract is clicked', async () => {
    const initialCart = {
      items: [
        {
          code: 'GT1',
          cost: 25,
          quantity: 1
        }
      ]
    }
    localStorage.setItem('cart', JSON.stringify(initialCart))
    render(
      <QuantityAdjuster product={mockProduct} />
    )

    expect(screen.getByTestId('item-quantity')).toHaveTextContent('1')

    const subtractButton = screen.getByTestId('remove-item')
    fireEvent.click(subtractButton)

    await waitFor(() => {
      expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')
    })
  })
})
