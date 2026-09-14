import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PortalDoAlunoLogin from './PortalDoAlunoLogin'
import LoginError from './Erro'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<PortalDoAlunoLogin />} />
        <Route path='/erro' element={<LoginError/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
