import { FileText, Clock, User, Stethoscope, DollarSign } from "lucide-react";
import type { Relatorio } from "../types/types";
import {
  relatorios,
  buscarBeneficiarioPorId,
  buscarPreBeneficiarioPorId,
  buscarDoacaoPorId,
  buscarDoadorPorId,
  buscarAtendimentoPorId,
  buscarDentistaPorId,
} from "../data/mockData";

// Componente que exibe um card de relatorio individual
const CardRelatorio = ({ relatorio }: { relatorio: Relatorio }) => {
  // Busca os dados relacionados ao relatorio
  const beneficiario = buscarBeneficiarioPorId(relatorio.nr_beneficiario);
  const preBenef = beneficiario
    ? buscarPreBeneficiarioPorId(beneficiario.id_pre_beneficiario)
    : undefined;
  const doacao = buscarDoacaoPorId(relatorio.nr_doacao);
  const doador = doacao ? buscarDoadorPorId(doacao.id_doador) : undefined;
  const atendimento = buscarAtendimentoPorId(relatorio.nr_atendimento);
  const dentista = atendimento
    ? buscarDentistaPorId(atendimento.id_dentista)
    : undefined;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 space-y-6">
      {/* Cabecalho do relatorio */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <FileText size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xl">
              Relatorio #{relatorio.id_relatorio}
            </h3>
            <p className="text-xs text-slate-400 font-bold">
              {new Date(relatorio.dt_hr_relatorio + "T00:00:00").toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
          <Clock size={14} className="text-emerald-600" />
          <span className="text-sm font-bold text-emerald-600">
            Voluntariado: {relatorio.hr_voluntariado}
          </span>
        </div>
      </div>

      {/* Dados relacionados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Beneficiario */}
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <User size={16} />
            <p className="text-xs font-black uppercase tracking-widest">
              Beneficiario
            </p>
          </div>
          {preBenef ? (
            <>
              <p className="font-bold text-slate-900">{preBenef.nm_nome}</p>
              <p className="text-xs text-slate-500">CPF: {preBenef.nr_cpf}</p>
            </>
          ) : (
            <p className="text-xs text-slate-400 italic">Dados indisponiveis</p>
          )}
        </div>

        {/* Doacao */}
        <div className="p-5 bg-green-50 rounded-2xl border border-green-100 space-y-2">
          <div className="flex items-center gap-2 text-green-600">
            <DollarSign size={16} />
            <p className="text-xs font-black uppercase tracking-widest">
              Doacao Vinculada
            </p>
          </div>
          {doacao ? (
            <>
              <p className="font-bold text-slate-900">
                R$ {doacao.vl_doacao.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500">
                Doador: {doador ? doador.nm_doador : "N/A"}
              </p>
            </>
          ) : (
            <p className="text-xs text-slate-400 italic">Dados indisponiveis</p>
          )}
        </div>

        {/* Atendimento */}
        <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 space-y-2">
          <div className="flex items-center gap-2 text-purple-600">
            <Stethoscope size={16} />
            <p className="text-xs font-black uppercase tracking-widest">
              Atendimento
            </p>
          </div>
          {atendimento ? (
            <>
              <p className="font-bold text-slate-900">
                {dentista ? dentista.nm_nome : "N/A"}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(atendimento.dt_hr_atendimento + "T00:00:00").toLocaleDateString("pt-BR")}
              </p>
            </>
          ) : (
            <p className="text-xs text-slate-400 italic">Dados indisponiveis</p>
          )}
        </div>
      </div>

      {/* Descricao do tratamento */}
      {atendimento && (
        <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-purple-400 text-sm text-slate-600 italic">
          <strong>Tratamento:</strong> {atendimento.ds_tratamento}
        </div>
      )}
    </div>
  );
};

const Relatorios = () => {
  // Calcula totais para o resumo
  const totalHoras = relatorios.reduce((soma, r) => {
    const partes = r.hr_voluntariado.replace("h", ":").split(":");
    const horas = parseInt(partes[0]) || 0;
    const minutos = parseInt(partes[1]) || 0;
    return soma + horas * 60 + minutos;
  }, 0);

  const horasFormatadas = `${Math.floor(totalHoras / 60)}h${String(totalHoras % 60).padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-10">
        {/* Cabecalho */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-500 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Relatorios</h1>
            <p className="text-emerald-100 font-medium">
              Acompanhe os resultados e o impacto das acoes do BridgeCare.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </section>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Total de Relatorios
            </p>
            <p className="text-3xl font-black text-emerald-600">
              {relatorios.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Horas de Voluntariado
            </p>
            <p className="text-3xl font-black text-blue-600">
              {horasFormatadas}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Atendimentos Reportados
            </p>
            <p className="text-3xl font-black text-purple-600">
              {relatorios.length}
            </p>
          </div>
        </div>

        {/* Lista de Relatorios */}
        <div className="space-y-6">
          {relatorios.map((relatorio) => (
            <CardRelatorio
              key={relatorio.id_relatorio}
              relatorio={relatorio}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Relatorios;
