import type { ReactNode } from 'react'
import Home from './components/Home'
import Customers from './components/Customers'
import Products from './components/Products'
import Categories from './components/Categories'
import Suppliers from './components/Suppliers'

export type Route = { path: string; label: string; element: ReactNode }

// Feature cards append one entry to this registry (an append-only hub edit).
export const routes: Route[] = [
  { path: '/', label: 'Home', element: <Home /> },
  // --- ROUTE REGISTRY ---
  { path: '/customers', label: 'Customers', element: <Customers /> },
  { path: '/products', label: 'Products', element: <Products /> },
  { path: '/categories', label: 'Categories', element: <Categories /> },
  { path: '/suppliers', label: 'Suppliers', element: <Suppliers /> },
]
