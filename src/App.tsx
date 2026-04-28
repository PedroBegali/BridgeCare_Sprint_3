import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import SobreProjeto from "./pages/SobreProjeto";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import MiniJogos from "./pages/jogo/Hub_jogos";
import JogoMemoria from "./pages/jogo/Jogo_Memoria";
import Login from "./pages/Login";
import DashboardDentista from "./pages/DashboardDentista";
import DashboardBeneficiario from "./pages/DashboardBeneficiario";
import DashboardAtendente from "./pages/DashboardAtendente";
import PainelEvidencias from "./pages/painel/PainelEvidencias";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Painel de Evidências - full-screen, sem header/footer */}
        <Route path="painel" element={<PainelEvidencias />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quem-somos" element={<QuemSomos />} />
          <Route path="sobre" element={<SobreProjeto />} />

          <Route path="mini-jogos" element={<MiniJogos />} />

          <Route path="mini-jogos/memoria" element={<JogoMemoria />} />

          <Route path="faq" element={<FAQ />} />
          <Route path="contato" element={<Contato />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard-dentista" element={<DashboardDentista />} />
          <Route
            path="dashboard-beneficiario"
            element={<DashboardBeneficiario />}
          />
          <Route path="dashboard-atendente" element={<DashboardAtendente />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
