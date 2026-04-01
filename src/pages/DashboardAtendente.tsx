import { useState } from 'react';

const DashboardAtendente = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('novos');
  const [buscaCpf, setBuscaCpf] = useState('');

  const reprovados = [
    { id: 1, nome: "Thiago Lima", motivo: "Fora da faixa etária", contato: "(11) 98888-7777" }
  ];

  const aprovados = [
    { id: 101, nome: "Ana Julia", cpf: "123.456.789-00", responsavel: "Carla Souza", dentista: "Dr. Ricardo", status: "Em tratamento" }
  ];

  const triagemPendente = [
    { id: 201, nome: "Marcos Vinicius", motivo: "Falta por imprevisto", telefone: "(11) 97777-6666" }
  ];

  
  const novasSolicitacoes = [
    { 
      id: 301, 
      nome: "Beatriz Santos", 
      idade: 14, 
      contato: "(11) 96666-5555", 
      email: "bia@email.com", 
      acessibilidade: true,
      responsavel: "Marta Santos" 
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl space-y-8">
        
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Painel de Gestão</h1>
            <p className="text-slate-500 font-medium italic">Central de Atendimento BridgeCare</p>
          </div>
          
          <nav className="flex flex-wrap gap-2 bg-slate-50 p-2 rounded-3xl border border-slate-100">
            <button onClick={() => setSecaoAtiva('novos')} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${secaoAtiva === 'novos' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>NOVOS</button>
            <button onClick={() => setSecaoAtiva('aprovados')} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${secaoAtiva === 'aprovados' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>APROVADOS</button>
            <button onClick={() => setSecaoAtiva('triagem')} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${secaoAtiva === 'triagem' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>TRIAGEM</button>
            <button onClick={() => setSecaoAtiva('reprovados')} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${secaoAtiva === 'reprovados' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-blue-600'}`}>REPROVADOS</button>
          </nav>
        </section>

        {/*  NOVAS SOLICITAÇÕES (PRÉ-CADASTRO) */}
        {secaoAtiva === 'novos' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {novasSolicitacoes.map(solicitacao => (
              <div key={solicitacao.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">🆕</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xl">{solicitacao.nome}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase">{solicitacao.idade} anos • {solicitacao.responsavel}</p>
                    </div>
                  </div>
                  {solicitacao.acessibilidade && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-3 py-1 rounded-full animate-pulse">VÍDEO CHAMADA</span>
                  )}
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <p className="text-sm text-slate-600"><strong>Telefone:</strong> {solicitacao.contato}</p>
                  <p className="text-sm text-slate-600"><strong>E-mail:</strong> {solicitacao.email}</p>
                </div>
                <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">
                  AVALIAR E FINALIZAR CADASTRO
                </button>
              </div>
            ))}
          </section>
        )}

        {/* GESTÃO DE APROVADOS (BUSCA POR CPF) */}
        {secaoAtiva === 'aprovados' && (
          <section className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <input 
                type="text" 
                placeholder="🔍 Digite o CPF do beneficiário para acessar seu perfil..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                value={buscaCpf}
                onChange={(e) => setBuscaCpf(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aprovados.map(beneficiario => (
                <div key={beneficiario.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                  <h4 className="font-bold text-slate-900 mb-1">{beneficiario.nome}</h4>
                  <p className="text-xs text-slate-400 font-bold mb-4">CPF: {beneficiario.cpf}</p>
                  <div className="space-y-2 mb-6">
                    <p className="text-xs text-slate-500"><strong>Resp:</strong> {beneficiario.responsavel}</p>
                    <p className="text-xs text-slate-500"><strong>Dentista:</strong> {beneficiario.dentista}</p>
                  </div>
                  <button className="w-full bg-slate-900 text-white text-[10px] font-black py-3 rounded-xl hover:bg-blue-600 transition-all uppercase tracking-widest">
                    VER HISTÓRICO E PRONTUÁRIOS
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TRIAGEM PENDENTE */}
        {secaoAtiva === 'triagem' && (
          <section className="space-y-6 animate-in fade-in duration-500">
            {triagemPendente.map(item => (
              <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border-l-8 border-amber-400 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{item.nome}</h4>
                  <p className="text-sm text-amber-600 font-bold uppercase tracking-tight">Motivo: {item.motivo}</p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">Ligar para {item.telefone}</button>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">REMARCAR AGORA</button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* REPROVADOS (SUPORTE EXTERNO) */}
        {secaoAtiva === 'reprovados' && (
          <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-900">Orientações de Atendimento Público</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reprovados.map(pessoa => (
                <div key={pessoa.id} className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{pessoa.nome}</h4>
                    <p className="text-xs text-red-600 font-bold uppercase">{pessoa.motivo}</p>
                  </div>
                  <p className="text-sm text-slate-500">Indicar Unidade de Saúde mais próxima do telefone: {pessoa.contato}</p>
                  <button className="w-full bg-white text-slate-900 text-[10px] font-black py-3 rounded-xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all uppercase">
                    INDICAR POSTO PÚBLICO
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
};

export default DashboardAtendente;