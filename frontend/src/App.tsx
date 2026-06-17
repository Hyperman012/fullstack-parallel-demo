import { useState } from 'react'
import { routes } from './routes'

export default function App() {
  const [path, setPath] = useState('/')
  const active = routes.find((r) => r.path === path) ?? routes[0]
  return (
    <div>
      <nav>
        {routes.map((r) => (
          <button key={r.path} onClick={() => setPath(r.path)}>
            {r.label}
          </button>
        ))}
      </nav>
      <main>{active.element}</main>
    </div>
  )
}
