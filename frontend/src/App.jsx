import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageCadastro from './Pages/PageCadastro';
import PageLogin from './Pages/PageLogin';
import PageEsqueceuSuaSenha from './Pages/PageEsqueceuSuaSenha';
import PageTestComponent from './Pages/PageTestComponent';
import PageTurmas from './Pages/PageTurmas';
import PageControleMensal from './Pages/PageControleMensal';
import PageRelatorio from "./Pages/PageRelatorio";
import PageRecibo from "./Pages/PageRecibo";
import PageFuncoes from "./Pages/PageFuncoes";
import PageSobreNos from "./Pages/PageSobreNos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLogin />} />
        <Route path="/cadastro" element={<PageCadastro />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/recuperarSenha" element={<PageEsqueceuSuaSenha />} />
        <Route path="/turmas" element={<PageTurmas />} />
        <Route path="/test" element={<PageTestComponent />} />
        <Route path="/controle-mensal" element={<PageControleMensal />} />
        <Route path="/relatorio" element={<PageRelatorio />} />
        <Route path="/recibo" element={<PageRecibo />} />
        <Route path="/funcoes" element={<PageFuncoes />} />
        <Route path="/sobre-nos" element={<PageSobreNos />} />
        <Route path="/recibo/:id" element={<PageRecibo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
