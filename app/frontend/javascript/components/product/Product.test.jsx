import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Product from './Product'

const mockProduct = {
  name: 'Green tea',
  price: '25',
  description: 'Green tea is good for your health',
  code: 'GT1'
}

describe('Product component', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    localStorage.clear()

    global.fetch = vi.fn(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve(mockProduct)
          })
        }, 50)
      })
    )
  })

  it('shows "Product not yet available" before the product loads', () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/product not yet available/i)).toBeInTheDocument()
  })

  it('displays product name, price, and description after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
      expect(screen.getByTestId('item-price')).toBeInTheDocument()
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    })
  })
}
)
