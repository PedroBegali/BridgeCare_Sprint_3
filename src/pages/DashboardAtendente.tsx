import { useState } from "react";
import {
  UserPlus,
  UserCheck,
  CalendarClock,
  UserX,
  Search,
  History,
  AlertCircle,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { PreBeneficiario } from "../types/types";
import {
  preBeneficiarios,
  triagens,
  beneficiarios,
  buscarPreBeneficiarioPorId,
  buscarEnderecoPorId,
  buscarProgramaPorId,
  buscarDentistaPorId,
  atendimentos,
} from "../data/mockData";

const CardSolicitacao = ({
  preBenef,
  endereco,
}: {
  preBenef: PreBeneficiario;
  endereco: string;
}) => {
  const hoje = new Date();
  const nascimento = new Date(preBenef.dt_nascimento + "T00:00:00");
  const idade = hoje.getFullYear() - nascimento.getFullYear();

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <UserPlus size={28} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xl">
              {preBenef.nm_nome}
            </h4>
            <p className="text-xs text-slate-400 font-bold uppercase">
              {idade} anos -{" "}
              {preBenef.sx_pre_beneficiario === "M" ? "Masculino" : "Feminino"}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
        <p className="text-sm text-slate-600">
          <strong>CPF:</strong> {preBenef.nr_cpf}
        </p>
        <p className="text-sm text-slate-600">
          <strong>Telefone:</strong> {preBenef.nr_telefone}
        </p>
        <p className="text-sm text-slate-600">
          <strong>E-mail:</strong> {preBenef.email}
        </p>
        <p className="text-sm text-slate-600">
          <strong>Endereco:</strong> {endereco}
        </p>
        {preBenef.ds_bucal && (
          <p className="text-sm text-slate-600 italic bg-blue-50 p-3 rounded-xl border-l-4 border-blue-400">
            <strong>Saude Bucal:</strong> {preBenef.ds_bucal}
          </p>
        )}
      </div>
      <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">
        AVALIAR E FINALIZAR CADASTRO
      </button>
    </div>
  );
};

const DashboardAtendente = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("novos");
  const [buscaCpf, setBuscaCpf] = useState("");

  const triagensAprovadas = triagens.filter((t) => t.st_criterios === "A");
  const triagensReprovadas = triagens.filter((t) => t.st_criterios === "R");

  const preBenefSemTriagem = preBeneficiarios.filter(
    (pb) => !triagens.some((t) => t.id_pre_beneficiario === pb.id_pre_beneficiario)
  );

  const beneficiariosAprovados = beneficiarios.map((b) => {
    const preBenef = buscarPreBeneficiarioPorId(b.id_pre_beneficiario);
    const programa = buscarProgramaPorId(b.id_programa);
    const atendimentosBenef = atendimentos.filter(
      (a) => a.id_beneficiario === b.id_beneficiario
    );
    const ultimoAtend =
      atendimentosBenef.length > 0
        ? atendimentosBenef[atendimentosBenef.length - 1]
        : undefined;
    const dentista = ultimoAtend
      ? buscarDentistaPorId(ultimoAtend.id_dentista)
      : undefined;

    return {
      beneficiario: b,
      preBenef,
      programa,
      dentista,
    };
  });

  const aprovadosFiltrados = beneficiariosAprovados.filter((item) =>
    item.preBenef?.nr_cpf.includes(buscaCpf)
  );

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl space-y-8">
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Painel de Gestao
            </h1>
            <p className="text-slate-500 font-medium italic">
              Central de Atendimento BridgeCare
            </p>
          </div>

          <nav className="flex flex-wrap gap-2 bg-slate-50 p-2 rounded-3xl border border-slate-100">
            {[
              { id: "novos", icon: UserPlus, label: "NOVOS" },
              { id: "aprovados", icon: UserCheck, label: "APROVADOS" },
              { id: "triagem", icon: CalendarClock, label: "TRIAGEM" },
              { id: "reprovados", icon: UserX, label: "REPROVADOS" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSecaoAtiva(btn.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                  secaoAtiva === btn.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-blue-600"
                }`}
              >
                <btn.icon size={16} /> {btn.label}
              </button>
            ))}
          </nav>
        </section>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {secaoAtiva === "novos" && (
            <section className="space-y-6">
              <p className="text-sm text-slate-500 ml-2">
                Pre-beneficiarios aguardando triagem comunitaria ({preBenefSemTriagem.length})
              </p>
              {preBenefSemTriagem.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {preBenefSemTriagem.map((pb) => {
                    const end = buscarEnderecoPorId(pb.id_endereco);
                    return (
                      <CardSolicitacao
                        key={pb.id_pre_beneficiario}
                        preBenef={pb}
                        endereco={
                          end
                            ? `${end.nm_rua}, ${end.nr_logradouro} - ${end.nm_bairro}`
                            : "Endereco nao informado"
                        }
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
                  <p className="text-slate-400 italic">
                    Todos os pre-beneficiarios ja passaram pela triagem.
                  </p>
                </div>
              )}
            </section>
          )}

          {secaoAtiva === "aprovados" && (
            <section className="space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <Search className="text-slate-400 ml-2" size={20} />
                <input
                  type="text"
                  placeholder="Digite o CPF do beneficiario para acessar seu perfil..."
                  className="w-full py-4 rounded-2xl bg-transparent border-none focus:ring-0 outline-none transition-all font-medium"
                  value={buscaCpf}
                  onChange={(e) => setBuscaCpf(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {aprovadosFiltrados.map((item) => (
                  <div
                    key={item.beneficiario.id_beneficiario}
                    className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900">
                        {item.preBenef?.nm_nome}
                      </h4>
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${
                          item.beneficiario.st_procedimento === "A"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.beneficiario.st_procedimento === "A" ? (
                          <><CheckCircle2 size={10} /> Ativo</>
                        ) : (
                          <><XCircle size={10} /> Inativo</>
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-bold mb-4">
                      CPF: {item.preBenef?.nr_cpf}
                    </p>
                    <div className="space-y-2 mb-6 text-slate-500 text-xs">
                      <p>
                        <strong>Programa:</strong>{" "}
                        {item.programa?.nm_programa_social || "N/A"}
                      </p>
                      <p>
                        <strong>Dentista:</strong>{" "}
                        {item.dentista?.nm_nome || "Ainda nao atribuido"}
                      </p>
                    </div>
                    <button className="w-full bg-slate-900 text-white text-[10px] font-black py-3 rounded-xl hover:bg-blue-600 transition-all uppercase flex items-center justify-center gap-2">
                      <History size={14} /> VER HISTORICO
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {secaoAtiva === "triagem" && (
            <section className="space-y-6">
              <p className="text-sm text-slate-500 ml-2">
                Triagens aprovadas ({triagensAprovadas.length})
              </p>
              {triagensAprovadas.map((triagem) => {
                const preBenef = buscarPreBeneficiarioPorId(
                  triagem.id_pre_beneficiario
                );
                if (!preBenef) return null;
                return (
                  <div
                    key={triagem.id_triagem}
                    className="bg-white p-8 rounded-[2.5rem] border-l-8 border-green-400 shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">
                          {preBenef.nm_nome}
                        </h4>
                        <p className="text-xs text-slate-400 font-bold">
                          CPF: {preBenef.nr_cpf} | Triagem em{" "}
                          {new Date(triagem.dt_hr_triagem + "T00:00:00").toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Aprovado
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 italic bg-green-50 p-4 rounded-2xl border-l-4 border-green-400">
                      {triagem.ds_triagem}
                    </p>
                  </div>
                );
              })}
            </section>
          )}

          {secaoAtiva === "reprovados" && (
            <section className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <AlertCircle className="text-red-500" /> Orientacoes de
                  Atendimento
                </h2>
                {triagensReprovadas.length > 0 ? (
                  <div className="space-y-6">
                    {triagensReprovadas.map((triagem) => {
                      const preBenef = buscarPreBeneficiarioPorId(
                        triagem.id_pre_beneficiario
                      );
                      if (!preBenef) return null;
                      return (
                        <div
                          key={triagem.id_triagem}
                          className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-900">
                                {preBenef.nm_nome}
                              </h4>
                              <p className="text-xs text-red-600 font-bold uppercase flex items-center gap-1">
                                <XCircle size={12} /> Reprovado na Triagem
                              </p>
                            </div>
                            <span className="text-xs text-slate-400">
                              {new Date(triagem.dt_hr_triagem + "T00:00:00").toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 italic">
                            {triagem.ds_triagem}
                          </p>
                          <p className="text-sm text-slate-500">
                            Contato: {preBenef.nr_telefone} | {preBenef.email}
                          </p>
                          <button className="w-full bg-white text-slate-900 text-[10px] font-black py-3 rounded-xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all uppercase flex items-center justify-center gap-2">
                            <MapPin size={14} /> INDICAR POSTO PUBLICO
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-slate-400 italic py-4">
                    Nenhuma triagem reprovada registrada.
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardAtendente;
