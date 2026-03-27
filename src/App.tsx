import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import SobreProjeto from './pages/SobreProjeto';
import Jogo from './pages/jogo/Jogo';
import FAQ from './pages/FAQ';
import Contato from './pages/Contato';
import Layout from './components/Layout';

// import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        
          
          
          <Route index element={<Home />} />
          
         
          <Route path="quem-somos" element={<QuemSomos />} />
          <Route path="sobre" element={<SobreProjeto />} />
          <Route path="mini-jogos" element={<Jogo />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contato" element={<Contato />} />

          {/* <Route path="*" element={<NotFound />} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;