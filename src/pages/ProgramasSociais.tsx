import { useState } from "react";
import { BookOpen, Users, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { ProgramaSocial } from "../types/types";
import {
  programasSociais,
  beneficiarios,
  buscarPreBeneficiarioPorId,
  buscarEnderecoPorId,
} from "../data/mockData";

// Componente que exibe detalhes de um beneficiario dentro do programa
const ItemBeneficiario = ({ idPreBeneficiario, stProcedimento }: { idPreBeneficiario: number; stProcedimento: "A" | "I" }) => {
  const preBenef = buscarPreBeneficiarioPorId(idPreBeneficiario);
  const endereco = preBenef ? buscarEnderecoPorId(preBenef.id_endereco) : undefined;

  if (!preBenef) return null;

  return (
    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-900">{preBenef.nm_nome}</h4>
          <p className="text-xs text-slate-400 font-bold">
            CPF: {preBenef.nr_cpf}
          </p>
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 ${
            stProcedimento === "A"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {stProcedimento === "A" ? (
            <>
              <CheckCircle2 size={12} /> Ativo
            </>
          ) : (
            <>
              <XCircle size={12} /> Inativo
            </>
          )}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <p>
          <strong>Sexo:</strong>{" "}
          {preBenef.sx_pre_beneficiario === "M" ? "Masculino" : "Feminino"}
        </p>
        <p>
          <strong>Nascimento:</strong>{" "}
          {new Date(preBenef.dt_nascimento + "T00:00:00").toLocaleDateString("pt-BR")}
        </p>
        <p>
          <strong>Tel:</strong> {preBenef.nr_telefone}
        </p>
      </div>
      {endereco && (
        <p className="text-xs text-slate-400">
          <strong>Endereco:</strong> {endereco.nm_rua}, {endereco.nr_logradouro}{" "}
          - {endereco.nm_bairro} ({endereco.nr_cep})
        </p>
      )}
      {preBenef.ds_bucal && (
        <p className="text-xs text-slate-500 italic bg-blue-50 p-3 rounded-xl border-l-4 border-blue-400">
          <strong>Saude Bucal:</strong> {preBenef.ds_bucal}
        </p>
      )}
    </div>
  );
};

// Componente que exibe um card de programa social
const CardPrograma = ({ programa }: { programa: ProgramaSocial }) => {
  const [aberto, setAberto] = useState(false);

  // Busca todos os beneficiarios vinculados a este programa
  const beneficiariosDoPrograma = beneficiarios.filter(
    (b) => b.id_programa === programa.id_programa
  );

  const ativos = beneficiariosDoPrograma.filter(
    (b) => b.st_procedimento === "A"
  ).length;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <BookOpen size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xl">
              {programa.nm_programa_social}
            </h3>
            <p className="text-xs text-slate-400 font-bold">
              ID do Programa: {programa.id_programa}
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center flex-1">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Beneficiarios
            </p>
            <p className="text-2xl font-black text-slate-900">
              {beneficiariosDoPrograma.length}
            </p>
          </div>
          <div className="bg-green-50 px-5 py-3 rounded-2xl border border-green-100 text-center flex-1">
            <p className="text-xs font-black text-green-500 uppercase tracking-widest">
              Ativos
            </p>
            <p className="text-2xl font-black text-green-600">{ativos}</p>
          </div>
        </div>

        <button
          onClick={() => setAberto(!aberto)}
          className="w-full flex items-center justify-center gap-2 text-indigo-600 font-bold text-sm py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition-all"
        >
          {aberto ? (
            <>
              Ocultar Beneficiarios <ChevronUp size={16} />
            </>
          ) : (
            <>
              <Users size={16} /> Ver Beneficiarios ({beneficiariosDoPrograma.length})
              <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {aberto && (
        <div className="px-8 pb-8 space-y-3">
          {beneficiariosDoPrograma.length > 0 ? (
            beneficiariosDoPrograma.map((benef) => (
              <ItemBeneficiario
                key={benef.id_beneficiario}
                idPreBeneficiario={benef.id_pre_beneficiario}
                stProcedimento={benef.st_procedimento}
              />
            ))
          ) : (
            <p className="text-center text-slate-400 text-sm italic py-4">
              Nenhum beneficiario vinculado a este programa.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const ProgramasSociais = () => {
  // Calcula totais gerais
  const totalBeneficiarios = beneficiarios.length;
  const totalAtivos = beneficiarios.filter(
    (b) => b.st_procedimento === "A"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-10">
        {/* Cabecalho */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-500 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Programas Sociais</h1>
            <p className="text-indigo-100 font-medium">
              Conhca os programas que transformam vidas atraves da saude bucal.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </section>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Programas Ativos
            </p>
            <p className="text-3xl font-black text-indigo-600">
              {programasSociais.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Total de Beneficiarios
            </p>
            <p className="text-3xl font-black text-slate-900">
              {totalBeneficiarios}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Beneficiarios Ativos
            </p>
            <p className="text-3xl font-black text-green-600">
              {totalAtivos}
            </p>
          </div>
        </div>

        {/* Lista de Programas */}
        <div className="space-y-6">
          {programasSociais.map((programa) => (
            <CardPrograma key={programa.id_programa} programa={programa} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProgramasSociais;
