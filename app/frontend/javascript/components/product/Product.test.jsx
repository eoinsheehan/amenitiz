import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
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
      expect(screen.getByText(mockProduct.price)).toBeInTheDocument()
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    })
  })

    it('increases amount when clicking Increase button', async () => {
            render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('Green tea')).toBeInTheDocument()
    })

    expect(screen.getByText(/Amount:/)).toHaveTextContent('0')
    const increaseButton = screen.getByText('Increase')
    fireEvent.click(increaseButton)

    await waitFor(() => {
      expect(screen.getByText(/Amount:/)).toHaveTextContent('1')
    })
  })
  
  it('retains amount at zero when subtract is clicked', async () => {
          render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('Green tea')).toBeInTheDocument()
    })

    expect(screen.getByText(/Amount:/)).toHaveTextContent('0')
    const decreaseButton = screen.getByText('Subtract')
    fireEvent.click(decreaseButton)

    await waitFor(() => {
      expect(screen.getByText(/Amount:/)).toHaveTextContent('0')
    })
  }) 
    it('decreases amount by one when subtract is clicked', async () => {
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
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Green tea')).toBeInTheDocument()
    })

    expect(screen.getByText(/Amount:/)).toHaveTextContent('1')
    const decreaseButton = screen.getByText('Subtract')
    fireEvent.click(decreaseButton)

    await waitFor(() => {
      expect(screen.getByText(/Amount:/)).toHaveTextContent('0')
    })
  }) 
})