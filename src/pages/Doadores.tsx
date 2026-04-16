import { useState } from "react";
import { Heart, DollarSign, CreditCard, Search, ChevronDown, ChevronUp } from "lucide-react";
import type { Doador, Doacao, FormaPagamento } from "../types/types";
import {
  doadores,
  buscarDoacoesPorDoador,
  buscarFormaPagamentoPorDoacao,
} from "../data/mockData";

// Componente que exibe um card de doacao individual
const CardDoacao = ({ doacao, pagamento }: { doacao: Doacao; pagamento: FormaPagamento | undefined }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
        <DollarSign size={20} />
      </div>
      <div>
        <p className="font-bold text-slate-900">
          R$ {doacao.vl_doacao.toFixed(2)}
        </p>
        <p className="text-xs text-slate-400 font-medium">
          {new Date(doacao.dt_hr_doacao + "T00:00:00").toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
    <div className="text-right">
      <span
        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
          doacao.st_periodicidade === "M"
            ? "bg-blue-100 text-blue-600"
            : "bg-purple-100 text-purple-600"
        }`}
      >
        {doacao.st_periodicidade === "M" ? "Mensal" : "Anual"}
      </span>
      {pagamento && (
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-end">
          <CreditCard size={12} /> {pagamento.ds_pagamento}
        </p>
      )}
    </div>
  </div>
);

// Componente que exibe um card de doador com suas doacoes
const CardDoador = ({ doador }: { doador: Doador }) => {
  const [aberto, setAberto] = useState(false);
  const doacoesDoDoador = buscarDoacoesPorDoador(doador.id_doador);

  const totalDoado = doacoesDoDoador.reduce(
    (soma, doacao) => soma + doacao.vl_doacao,
    0
  );

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
              <Heart size={28} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                {doador.nm_doador}
              </h3>
              <p className="text-xs text-slate-400 font-bold">
                CPF: {doador.nr_cpf}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Total Doado
            </p>
            <p className="text-xl font-black text-green-600">
              R$ {totalDoado.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <p>
            <strong>Tel:</strong> {doador.nr_telefone}
          </p>
          <p>
            <strong>Email:</strong> {doador.email}
          </p>
        </div>

        <button
          onClick={() => setAberto(!aberto)}
          className="w-full flex items-center justify-center gap-2 text-blue-600 font-bold text-sm py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all"
        >
          {aberto ? (
            <>
              Ocultar Doacoes <ChevronUp size={16} />
            </>
          ) : (
            <>
              Ver Doacoes ({doacoesDoDoador.length}) <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {aberto && (
        <div className="px-8 pb-8 space-y-3">
          {doacoesDoDoador.length > 0 ? (
            doacoesDoDoador.map((doacao) => (
              <CardDoacao
                key={doacao.id_doacao}
                doacao={doacao}
                pagamento={buscarFormaPagamentoPorDoacao(doacao.id_doacao)}
              />
            ))
          ) : (
            <p className="text-center text-slate-400 text-sm italic py-4">
              Nenhuma doacao registrada.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const Doadores = () => {
  const [busca, setBusca] = useState("");

  // Filtra doadores pelo nome ou CPF
  const doadoresFiltrados = doadores.filter(
    (doador) =>
      doador.nm_doador.toLowerCase().includes(busca.toLowerCase()) ||
      doador.nr_cpf.includes(busca)
  );

  // Calcula o total geral de doacoes
  const totalGeralDoacoes = doadores.reduce((total, doador) => {
    const doacoesDoDoador = buscarDoacoesPorDoador(doador.id_doador);
    return total + doacoesDoDoador.reduce((soma, d) => soma + d.vl_doacao, 0);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-10">
        {/* Cabecalho */}
        <section className="bg-gradient-to-r from-red-500 to-pink-500 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Nossos Doadores</h1>
            <p className="text-red-100 font-medium">
              Conhca as pessoas que tornam o BridgeCare possivel.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </section>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Total de Doadores
            </p>
            <p className="text-3xl font-black text-slate-900">
              {doadores.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Total Arrecadado
            </p>
            <p className="text-3xl font-black text-green-600">
              R$ {totalGeralDoacoes.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Doacoes Registradas
            </p>
            <p className="text-3xl font-black text-blue-600">
              {doadores.reduce(
                (total, d) =>
                  total + buscarDoacoesPorDoador(d.id_doador).length,
                0
              )}
            </p>
          </div>
        </div>

        {/* Busca */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <Search className="text-slate-400 ml-2" size={20} />
          <input
            type="text"
            placeholder="Buscar doador por nome ou CPF..."
            className="w-full py-3 bg-transparent border-none focus:ring-0 outline-none font-medium"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Lista de Doadores */}
        <div className="space-y-6">
          {doadoresFiltrados.length > 0 ? (
            doadoresFiltrados.map((doador) => (
              <CardDoador key={doador.id_doador} doador={doador} />
            ))
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
              <p className="text-slate-400 italic">
                Nenhum doador encontrado para "{busca}".
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Doadores;
