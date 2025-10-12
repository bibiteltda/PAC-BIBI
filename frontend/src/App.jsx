import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageCadastro from './Pages/PageCadastro';
import PageLogin from './Pages/PageLogin';
import PageEsqueceuSuaSenha from './Pages/PageEsqueceuSuaSenha';
import PageTestComponent from './Pages/PageTestComponent';
import PageControleMensal from './Pages/PageControleMensal';
// import PageRelatorio from "./Pages/PageRelatorio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<PageCadastro />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/recuperarSenha" element={<PageEsqueceuSuaSenha />} />
        <Route path="/redefinirSenha" element={<PageEsqueceuSuaSenha />} />  {/*talvez tenha que mudar*/}
        <Route path="/test" element={<PageTestComponent />} />
        <Route path="/financeiro" element={<PageEsqueceuSuaSenha />} /> {/* Temq ue ver oque é tbm*/}
        <Route path="/controle-mensal" element={<PageControleMensal />} />
        {/* <Route path="/relatorio" element={<PageRelatorio />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
