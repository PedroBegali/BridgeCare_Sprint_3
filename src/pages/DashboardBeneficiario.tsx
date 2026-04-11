import { useState } from "react";
import {
  Calendar,
  ArrowRight,
  UserCircle2,
  MapPin,
  ClipboardCheck,
} from "lucide-react";

const CardConsultaAtiva = ({ consulta }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
          <Calendar size={32} />
        </div>
        <div>
          <p className="text-blue-600 font-black text-xl">{consulta.data}</p>
          <p className="text-slate-400 font-bold text-sm uppercase">
            {consulta.hora}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
            Dentista Responsável
          </h4>
          <p className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <UserCircle2 size={18} className="text-slate-400" />{" "}
            {consulta.dentista}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
            Local do Atendimento
          </h4>
          <p className="text-slate-600 font-medium text-sm flex items-center gap-2">
            <MapPin size={16} className="text-slate-400" /> {consulta.local}
          </p>
        </div>
      </div>
    </div>
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
      <div>
        <h4 className="font-bold text-blue-700 mb-1">O que será feito:</h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          {consulta.descricao}
        </p>
      </div>
      <div className="pt-4 border-t border-slate-200">
        <h4 className="font-bold text-orange-600 mb-1">Recomendações:</h4>
        <p className="text-sm text-slate-600 italic">
          "{consulta.recomendacoes}"
        </p>
      </div>
    </div>
  </div>
);

const CardHistorico = ({ item }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-6 hover:border-blue-200 transition-colors group">
    <div className="flex gap-6">
      <div className="text-center bg-slate-50 p-3 rounded-2xl h-fit border border-slate-100">
        <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">
          Concluída
        </p>
        <p className="font-bold text-slate-900">
          {item.data.split("/")[0]}/{item.data.split("/")[1]}
        </p>
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{item.dentista}</h4>
        <p className="text-xs text-slate-400 font-medium mb-3">{item.local}</p>
        <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed italic border-l-4 border-blue-500 flex items-start gap-2">
          <ClipboardCheck size={14} className="mt-0.5 text-blue-500" />
          <span>
            <strong>Prontuário:</strong> {item.prontuario}
          </span>
        </div>
      </div>
    </div>
    <button className="text-blue-600 font-bold text-sm self-center flex items-center gap-2 group-hover:translate-x-2 transition-transform">
      Ver detalhes <ArrowRight size={16} />
    </button>
  </div>
);

const DashboardBeneficiario = () => {
  const [nome, setNome] = useState("Fátima Oliveira");
  const [email, setEmail] = useState("fatima.oliveira@email.com");
  const [endereco, setEndereco] = useState(
    "Rua das Flores, 123 - São Paulo, SP",
  );
  const [abaAtiva, setAbaAtiva] = useState("agenda");

  const proximasConsultas = [
    {
      id: 1,
      data: "15/04/2026",
      hora: "10:00",
      dentista: "Dra. Ana Beatriz",
      local: "Unidade Central - Av. Paulista, 1000",
      descricao: "Limpeza profilática e avaliação de cáries.",
      recomendacoes:
        "Trazer escova de dentes e chegar com 15 minutos de antecedência.",
    },
  ];

  const historicoConsultas = [
    {
      id: 101,
      data: "10/01/2026",
      dentista: "Dr. Ricardo Santos",
      local: "Clínica Parceira Sul",
      prontuario:
        "Paciente apresentou boa higiene. Realizada restauração no dente 24.",
    },
    {
      id: 102,
      data: "20/02/2026",
      dentista: "Dra. Maria Silva",
      local: "Unidade Norte - Rua das Palmeiras, 500",
      prontuario: "Paciente relatou dor de dente. Realizado exame radiológico.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-10">
        <section className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2 text-white">
              Olá, {nome.split(" ")[0]}!
            </h1>
            <p className="text-blue-100 font-medium">
              Acompanhe seu tratamento e mantenha seus dados atualizados.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </section>

        <div className="flex gap-4 bg-white p-2 rounded-3xl shadow-sm border border-slate-100 w-fit">
          <button
            onClick={() => setAbaAtiva("agenda")}
            className={`px-8 py-3 rounded-2xl font-bold transition-all ${abaAtiva === "agenda" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-blue-600"}`}
          >
            Minhas Consultas
          </button>
          <button
            onClick={() => setAbaAtiva("perfil")}
            className={`px-8 py-3 rounded-2xl font-bold transition-all ${abaAtiva === "perfil" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-blue-600"}`}
          >
            Dados Pessoais
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {abaAtiva === "agenda" ? (
            <div className="space-y-12">
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900 ml-2">
                  Próxima Consulta
                </h2>
                {proximasConsultas.map((consulta) => (
                  <CardConsultaAtiva key={consulta.id} consulta={consulta} />
                ))}
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900 ml-2">
                  Histórico de Atendimentos
                </h2>
                <div className="space-y-4">
                  {historicoConsultas.map((item) => (
                    <CardHistorico key={item.id} item={item} />
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 max-w-2xl mx-auto space-y-8">
              <h2 className="text-2xl font-black text-slate-900">
                Atualizar Cadastro
              </h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">
                    E-mail de Contato
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">
                    Endereço Residencial
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900 resize-none"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                </div>
                <button className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98] transition-all uppercase tracking-widest text-sm">
                  Salvar Alterações
                </button>
              </form>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardBeneficiario;
