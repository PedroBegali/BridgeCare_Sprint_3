import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const userLower = usuario.toLowerCase();

    // Lógica de distinção por prefixo
    if (userLower.startsWith('dt')) {
      console.log("Login como Dentista");
      navigate('/dashboard-dentista'); 
    } else if (userLower.startsWith('at')) {
      console.log("Login como Atendente");
      navigate('/dashboard-atendente');
    } else if (userLower.startsWith('bn')) {
      console.log("Login como Beneficiário");
      navigate('/dashboard-beneficiario');
    } else {
      setErro("Usuário não reconhecido. Use os prefixos dt, at ou bn.");
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Bem-vindo</h2>
          <p className="text-slate-500 text-sm italic">Acesse sua conta BridgeCare</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Usuário</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
              placeholder="Ex: dt0001, at0001..."
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="text-red-500 text-xs font-bold text-center animate-pulse">{erro}</p>}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98] transition-all tracking-widest uppercase text-sm"
          >
            Entrar no Portal
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 font-medium">Esqueceu suas credenciais? <span className="text-blue-500 cursor-pointer hover:underline">Fale com o suporte</span></p>
        </div>
      </div>
    </main>
  );
};

export default Login;