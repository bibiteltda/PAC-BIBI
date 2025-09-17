import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageCadastro from './Pages/PageCadastro';
import PageLogin from './Pages/PageLogin';
import PageEsqueceuSuaSenha from './Pages/PageEsqueceuSuaSenha';
import PageTestComponent from './Pages/PageTestComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<PageCadastro />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/recuperarSenha" element={<PageEsqueceuSuaSenha />} />
        <Route path="/test" element={<PageTestComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
