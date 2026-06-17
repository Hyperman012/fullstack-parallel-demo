import type { ReactNode } from 'react'
import Home from './components/Home'

export type Route = { path: string; label: string; element: ReactNode }

// Feature cards append one entry to this registry (an append-only hub edit).
export const routes: Route[] = [
  { path: '/', label: 'Home', element: <Home /> },
  // --- ROUTE REGISTRY ---
]
