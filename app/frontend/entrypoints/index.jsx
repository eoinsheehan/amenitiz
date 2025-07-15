import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from '../javascript/components/App'

const domNode = document.getElementById('app')
const root = createRoot(domNode)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>)