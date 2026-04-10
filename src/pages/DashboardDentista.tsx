import { useState } from "react";
import {
  Calendar,
  Search,
  User,
  Package,
  ClipboardList,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
 
// --- SUB-COMPONENTES (Para facilitar commits da equipe) ---
 
// Alan: Pode trabalhar na estilização e estados de hover deste card
const CardAgenda = ({ paciente, data, hora, local }: any) => (
<div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
<User size={24} />
</div>
<div>
<h4 className="font-bold text-slate-900">{paciente}</h4>
<p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
          {local}
</p>
</div>
</div>
<div className="mt-4 md:mt-0 text-right">
<p className="text-sm font-black text-blue-600">{data}</p>
<p className="text-xs text-slate-400 font-bold">{hora}</p>
</div>
</div>
);
 
// Lucas: Pode trabalhar na lógica de exibição e cores dos alertas de prontuário
const ItemPendencia = ({ paciente, data, local }: any) => (
<div className="p-5 rounded-2xl bg-orange-50 border border-orange-100 space-y-3">
<div>
<p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">
        Aguardando Prontuário
</p>
<h4 className="font-bold text-slate-900">{paciente}</h4>
<p className="text-[10px] text-slate-400 font-bold uppercase">
        {data} • {local}
</p>
</div>
<button className="w-full bg-white text-orange-600 text-xs font-black py-3 rounded-xl border border-orange-200 hover:bg-orange-600 hover:text-white transition-all shadow-sm">
      ADICIONAR AGORA
</button>
</div>
);
 
// --- COMPONENTE PRINCIPAL ---
 
const DashboardDentista = () => {
  const [estaAtivo, setEstaAtivo] = useState(true);
  const [filtroTempo, setFiltroTempo] = useState("semana");
  const [buscaBeneficiario, setBuscaBeneficiario] = useState("");
 
  const consultasPendentes = [
    { id: 1, paciente: "Enzo Oliveira", data: "28/03/2026", local: "Unidade Central" },
    { id: 2, paciente: "Maria Eduarda", data: "30/03/2026", local: "Clínica Parceira Sul" },
  ];
 
  const agenda = [
    { id: 101, paciente: "João Silva", data: "02/04/2026", hora: "09:00", local: "Unidade Central" },
    { id: 102, paciente: "Ana Clara", data: "03/04/2026", hora: "14:30", local: "Clínica Parceira Norte" },
  ];
 
  return (
<main className="min-h-screen bg-slate-50 py-12 px-6">
<div className="container mx-auto max-w-7xl space-y-10">
        {/* Header Status */}
<section className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 gap-6">
<div className="space-y-1">
<h1 className="text-3xl font-black text-slate-900 leading-none">Olá, Dr. Augusto Lopes!</h1>
<p className="text-slate-500 font-medium italic">Bem-vindo ao seu painel de controle BridgeCare.</p>
</div>
<div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
<span className={`text-xs font-black uppercase tracking-widest ${estaAtivo ? "text-green-600" : "text-red-500"}`}>
              Status: {estaAtivo ? "Disponível" : "Indisponível"}
</span>
<button
              onClick={() => setEstaAtivo(!estaAtivo)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${estaAtivo ? "bg-green-500" : "bg-slate-300"}`}
>
<div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${estaAtivo ? "translate-x-6" : "translate-x-0"}`}></div>
</button>
</div>
</section>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
<div className="lg:col-span-2 space-y-8">
<div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
<h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
<Calendar size={20} className="text-blue-600" /> Sua Agenda
</h2>
<div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100 w-full md:w-auto">
                  {["semana", "mes"].map((periodo) => (
<button
                      key={periodo}
                      onClick={() => setFiltroTempo(periodo)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtroTempo === periodo ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}
>
                      {periodo === "semana" ? "Semana" : "Mês"}
</button>
                  ))}
</div>
</div>
 
              <div className="relative">
<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
<input
                  type="text"
                  placeholder="Buscar beneficiário ou local..."
                  className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                  value={buscaBeneficiario}
                  onChange={(e) => setBuscaBeneficiario(e.target.value)}
                />
</div>
 
              <div className="space-y-4">
                {agenda.map((item) => (
<CardAgenda key={item.id} {...item} />
                ))}
</div>
</div>
 
            {/* Solicitação de Materiais */}
<div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
<div className="relative z-10 space-y-6">
<div className="flex items-center gap-4">
<Package size={32} className="text-blue-400" />
<h2 className="text-2xl font-bold">Solicitar Materiais</h2>
</div>
<p className="text-slate-400 text-sm max-w-md">Precisa de insumos? Solicite o apoio da ONG diretamente por aqui.</p>
<form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
<input
                    type="text"
                    placeholder="Ex: Luvas, Resina, Gaze..."
                    className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-slate-500"
                  />
<button className="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 text-sm uppercase tracking-widest">
                    Enviar
</button>
</form>
</div>
<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
</div>
</div>
 
          {/* Sidebar de Pendências */}
<div className="space-y-8">
<div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
<h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
<ClipboardList size={20} className="text-orange-500" /> Prontuários Pendentes
</h3>
<div className="space-y-4">
                {consultasPendentes.map((pendencia) => (
<ItemPendencia key={pendencia.id} {...pendencia} />
                ))}
                {consultasPendentes.length === 0 && (
<p className="text-center text-slate-400 text-sm italic py-4">Tudo em dia! ✨</p>
                )}
</div>
</div>
 
            <div className="bg-blue-50 p-6 rounded-4xl border border-blue-100 flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-3">
<HelpCircle size={24} className="text-blue-600" />
<span className="text-sm font-bold text-blue-700">Dúvidas sobre o sistema?</span>
</div>
<ArrowRight className="text-blue-400 group-hover:translate-x-2 transition-transform" size={18} />
</div>
</div>
</div>
</div>
</main>
  );
};
 
export default DashboardDentista;