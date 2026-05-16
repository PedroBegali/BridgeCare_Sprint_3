import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://api-backend-bridgecare.onrender.com";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.toLowerCase().startsWith("at")) {
      setCpf(value);
      return;
    }

    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const cleanCpf = cpf.replace(/\D/g, "");
    const isAtendente =
      cpf.toLowerCase() === "atendente" || cleanCpf === "00000000000";

    if (senha !== "123456") {
      setErro("Senha incorreta. (Dica: use 123456)");
      setLoading(false);
      return;
    }

    if (isAtendente) {
      localStorage.setItem("userRole", "ATENDENTE");
      navigate("/dashboard-atendente");
      setLoading(false);
      return;
    }

    if (cleanCpf.length !== 11) {
      setErro("Digite um CPF válido com 11 dígitos.");
      setLoading(false);
      return;
    }

    try {
      const resBeneficiarios = await fetch(
        `${API_BASE_URL}/beneficiarios`,
      ).catch(() => null);
      if (resBeneficiarios && resBeneficiarios.ok) {
        const beneficiarios = await resBeneficiarios.json();

        const beneficiarioEncontrado = beneficiarios.find((b: any) => {
          const cpfBanco = b.cpfPreBeneficiario
            ? b.cpfPreBeneficiario.replace(/\D/g, "")
            : "";
          return cpfBanco === cleanCpf;
        });

        if (beneficiarioEncontrado) {
          localStorage.setItem("userRole", "BENEFICIARIO");
          localStorage.setItem(
            "userId",
            beneficiarioEncontrado.idBeneficiario.toString(),
          );
          navigate("/dashboard-beneficiario");
          return;
        }
      }

      const resDentistas = await fetch(`${API_BASE_URL}/dentistas`).catch(
        () => null,
      );
      if (resDentistas && resDentistas.ok) {
        const dentistas = await resDentistas.json();

        const dentistaEncontrado = dentistas.find((d: any) => {
          const cpfBanco = d.cpfDentista
            ? d.cpfDentista.replace(/\D/g, "")
            : "";
          return cpfBanco === cleanCpf;
        });

        if (dentistaEncontrado) {
          localStorage.setItem("userRole", "DENTISTA");
          localStorage.setItem(
            "userId",
            dentistaEncontrado.idDentista.toString(),
          );
          navigate("/dashboard-dentista");
          return;
        }
      }

      setErro("CPF não encontrado na base de Dentistas ou Beneficiários.");
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Bem-vindo</h2>
          <p className="text-slate-500 text-sm italic">
            Acesse sua conta BridgeCare
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              CPF do Utilizador
            </label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Senha
            </label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-bold text-center p-3 rounded-xl animate-in zoom-in">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98] transition-all tracking-widest uppercase text-sm disabled:opacity-70 flex justify-center"
          >
            {loading ? "VERIFICANDO..." : "ENTRAR NO PORTAL"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Dúvidas?{" "}
            <Link
              to="/contato"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Fale com o suporte
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
