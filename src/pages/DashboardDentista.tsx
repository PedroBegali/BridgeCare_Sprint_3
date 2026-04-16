import { useState } from "react";
import {
  Calendar,
  Search,
  User,
  Package,
  ClipboardList,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { Atendimento } from "../types/types";
import {
  dentistas,
  buscarAtendimentosPorDentista,
  buscarBeneficiarioPorId,
  buscarPreBeneficiarioPorId,
  buscarEnderecoPorId,
} from "../data/mockData";

const CardAgenda = ({
  atendimento,
  nomePaciente,
  localAtendimento,
}: {
  atendimento: Atendimento;
  nomePaciente: string;
  localAtendimento: string;
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
        <User size={24} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{nomePaciente}</h4>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
          {localAtendimento}
        </p>
      </div>
    </div>
    <div className="mt-4 md:mt-0 text-right">
      <p className="text-sm font-black text-blue-600">
        {new Date(atendimento.dt_hr_atendimento + "T00:00:00").toLocaleDateString("pt-BR")}
      </p>
      <p className="text-xs text-slate-400 font-bold">
        {atendimento.ds_tratamento.substring(0, 40)}...
      </p>
    </div>
  </div>
);

const ItemPendencia = ({
  nomePaciente,
  data,
  local,
}: {
  nomePaciente: string;
  data: string;
  local: string;
}) => (
  <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100 space-y-3">
    <div>
      <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">
        Aguardando Prontuario
      </p>
      <h4 className="font-bold text-slate-900">{nomePaciente}</h4>
      <p className="text-[10px] text-slate-400 font-bold uppercase">
        {data} - {local}
      </p>
    </div>
    <button className="w-full bg-white text-orange-600 text-xs font-black py-3 rounded-xl border border-orange-200 hover:bg-orange-600 hover:text-white transition-all shadow-sm">
      ADICIONAR AGORA
    </button>
  </div>
);

const DashboardDentista = () => {
  const dentistaLogado = dentistas.find((d) => d.st_atividade === "A");

  const [estaAtivo, setEstaAtivo] = useState(
    dentistaLogado?.st_atividade === "A"
  );
  const [filtroTempo, setFiltroTempo] = useState("semana");
  const [buscaBeneficiario, setBuscaBeneficiario] = useState("");

  const atendimentosDoDentista = dentistaLogado
    ? buscarAtendimentosPorDentista(dentistaLogado.id_dentista)
    : [];

  const agendaCompleta = atendimentosDoDentista.map((atend) => {
    const beneficiario = buscarBeneficiarioPorId(atend.id_beneficiario);
    const preBenef = beneficiario
      ? buscarPreBeneficiarioPorId(beneficiario.id_pre_beneficiario)
      : undefined;
    const endereco = preBenef
      ? buscarEnderecoPorId(preBenef.id_endereco)
      : undefined;

    return {
      atendimento: atend,
      nomePaciente: preBenef?.nm_nome || "Paciente nao encontrado",
      localAtendimento: endereco
        ? `${endereco.nm_rua}, ${endereco.nr_logradouro} - ${endereco.nm_bairro}`
        : "Local nao informado",
    };
  });

  const agendaFiltrada = agendaCompleta.filter(
    (item) =>
      item.nomePaciente.toLowerCase().includes(buscaBeneficiario.toLowerCase()) ||
      item.localAtendimento.toLowerCase().includes(buscaBeneficiario.toLowerCase())
  );

  const enderecoDentista = dentistaLogado
    ? buscarEnderecoPorId(dentistaLogado.id_endereco)
    : undefined;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl space-y-10">
        <section className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 leading-none">
              Ola, {dentistaLogado?.nm_nome || "Dentista"}!
            </h1>
            <p className="text-slate-500 font-medium italic">
              {dentistaLogado?.ds_especialidade} | CRO:{" "}
              {dentistaLogado?.nr_cro}
            </p>
            {enderecoDentista && (
              <p className="text-xs text-slate-400">
                {enderecoDentista.nm_rua}, {enderecoDentista.nr_logradouro} -{" "}
                {enderecoDentista.nm_bairro}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span
              className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${estaAtivo ? "text-green-600" : "text-red-500"}`}
            >
              {estaAtivo ? (
                <CheckCircle2 size={14} />
              ) : (
                <XCircle size={14} />
              )}
              Status: {estaAtivo ? "Disponivel" : "Indisponivel"}
            </span>
            <button
              onClick={() => setEstaAtivo(!estaAtivo)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${estaAtivo ? "bg-green-500" : "bg-slate-300"}`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${estaAtivo ? "translate-x-6" : "translate-x-0"}`}
              ></div>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" /> Sua Agenda
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-black">
                    {agendaFiltrada.length} atendimentos
                  </span>
                </h2>
                <div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100 w-full md:w-auto">
                  {["semana", "mes"].map((periodo) => (
                    <button
                      key={periodo}
                      onClick={() => setFiltroTempo(periodo)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtroTempo === periodo ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}
                    >
                      {periodo === "semana" ? "Semana" : "Mes"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar beneficiario ou local..."
                  className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                  value={buscaBeneficiario}
                  onChange={(e) => setBuscaBeneficiario(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {agendaFiltrada.length > 0 ? (
                  agendaFiltrada.map((item) => (
                    <CardAgenda
                      key={item.atendimento.id_atendimento}
                      atendimento={item.atendimento}
                      nomePaciente={item.nomePaciente}
                      localAtendimento={item.localAtendimento}
                    />
                  ))
                ) : (
                  <p className="text-center text-slate-400 text-sm italic py-4">
                    Nenhum atendimento encontrado.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <Package size={32} className="text-blue-400" />
                  <h2 className="text-2xl font-bold">Solicitar Materiais</h2>
                </div>
                <p className="text-slate-400 text-sm max-w-md">
                  Precisa de insumos? Solicite o apoio da ONG diretamente por
                  aqui.
                </p>
                <form
                  className="flex gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
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

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ClipboardList size={20} className="text-orange-500" />{" "}
                Prontuarios Pendentes
              </h3>
              <div className="space-y-4">
                {agendaCompleta.length > 0 ? (
                  agendaCompleta.slice(0, 2).map((item) => (
                    <ItemPendencia
                      key={item.atendimento.id_atendimento}
                      nomePaciente={item.nomePaciente}
                      data={new Date(
                        item.atendimento.dt_hr_atendimento + "T00:00:00"
                      ).toLocaleDateString("pt-BR")}
                      local={item.localAtendimento}
                    />
                  ))
                ) : (
                  <p className="text-center text-slate-400 text-sm italic py-4">
                    Tudo em dia!
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-4xl border border-blue-100 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <HelpCircle size={24} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-700">
                  Duvidas sobre o sistema?
                </span>
              </div>
              <ArrowRight
                className="text-blue-400 group-hover:translate-x-2 transition-transform"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardDentista;
