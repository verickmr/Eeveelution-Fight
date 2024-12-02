import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Game } from './pages/Game.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter><Routes>
      <Route path="/" element={<App />} />
      <Route path="/game" element={<Game />} />
    </Routes></BrowserRouter>
    
  </StrictMode>,
)
