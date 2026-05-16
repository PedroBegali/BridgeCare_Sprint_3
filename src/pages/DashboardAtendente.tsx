import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  UserPlus,
  Users,
  CalendarClock,
  Search,
  EarOff,
  History,
  LayoutDashboard,
  MoreVertical,
  Download,
  Stethoscope,
  X,
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  UserX,
  Trash2,
  MapPlus,
  Check,
} from "lucide-react";

const API_BASE_URL = "https://api-backend-bridgecare.onrender.com";

const EstatisticaCard = ({ titulo, valor, icone: Icon, cor }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-xl ${cor}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{titulo}</p>
      <h3 className="text-2xl font-bold text-slate-900">{valor}</h3>
    </div>
  </div>
);

const TabelaBeneficiarios = ({ aprovados }: any) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
      <h3 className="font-bold text-slate-900 text-lg">Beneficiários Ativos</h3>
      <button className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-all">
        <Download size={16} /> Exportar Relatório
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
            <th className="p-4 font-bold">Nome do Beneficiário</th>
            <th className="p-4 font-bold">CPF</th>
            <th className="p-4 font-bold">Dentista Vinculado</th>
            <th className="p-4 font-bold text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {aprovados.map((b: any) => (
            <tr key={b.idBeneficiario} className="hover:bg-slate-50/80 transition-colors">
              <td className="p-4 font-medium text-slate-900">{b.nmPreBeneficiario}</td>
              <td className="p-4 text-slate-500">{b.cpfPreBeneficiario}</td>
              <td className="p-4">
                <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit font-medium text-xs">
                  <Stethoscope size={14} /> Atribuído
                </span>
              </td>
              <td className="p-4 flex justify-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <History size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
          {aprovados.length === 0 && (
            <tr>
              <td colSpan={4} className="p-8 text-center text-slate-500">Nenhum beneficiário encontrado na base de dados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const DashboardAtendente = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [solicitantes, setSolicitantes] = useState<any[]>([]);
  const [preBeneficiarios, setPreBeneficiarios] = useState<any[]>([]);
  const [beneficiarios, setBeneficiarios] = useState<any[]>([]);
  const [triagens, setTriagens] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [solicitanteSelecionado, setSolicitanteSelecionado] = useState<any>(null);

  const { register, handleSubmit, setValue, reset } = useForm();
  const formEnderecoTriagem = useForm(); 

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resSol, resPre, resBen, resTri] = await Promise.all([
        fetch(`${API_BASE_URL}/solicitantes`).catch(() => ({ json: () => [] })),
        fetch(`${API_BASE_URL}/pre-beneficiarios`).catch(() => ({ json: () => [] })),
        fetch(`${API_BASE_URL}/beneficiarios`).catch(() => ({ json: () => [] })),
        fetch(`${API_BASE_URL}/triagens/proximas`).catch(() => ({ json: () => [] })),
      ]);

      setSolicitantes(await resSol.json());
      setPreBeneficiarios(await resPre.json());
      setBeneficiarios(await resBen.json());
      setTriagens(await resTri.json());
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const preBeneficiariosEmAnalise = preBeneficiarios.filter((pb) => pb.stSituacao === "AN");
  const preBeneficiariosReprovados = preBeneficiarios.filter((pb) => pb.stSituacao === "RP");

  const onSubmitCadastro = async (data: any) => {
    try {
      const payload = {
        nmPreBeneficiario: data.nomeCompleto,
        cpfPreBeneficiario: data.cpf.replace(/\D/g, ""),
        dtNascimento: data.dataNascimento,
        sxPreBeneficiario: data.sexo,
        dsProblemaDentario: data.problemaDentario,
        stSituacao: "AN",
        idProgramaSocial: 1, 
        idSolicitante: solicitanteSelecionado.idSolicitante,
        idTriagem: Number(data.idTriagem), 
        endereco: {
          nmLocal: "P", 
          nrCep: data.cep.replace(/\D/g, ""), 
          nmLogradouro: data.rua,
          nrLogradouro: Number(data.numero), 
          nmBairro: data.bairro,
          nmCidade: data.cidade,
        },
      };

      const res = await fetch(`${API_BASE_URL}/pre-beneficiarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setCadastroSucesso(true);
        carregarDados();
        setTimeout(() => {
          setIsModalOpen(false);
          setCadastroSucesso(false);
        }, 2500);
      } else {
        alert("Erro ao salvar cadastro. Verifique os dados e a ligação ao Back-end.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const atualizarStatusPreBeneficiario = async (id: number, novoStatus: "AP" | "RP") => {
    try {
      const res = await fetch(`${API_BASE_URL}/pre-beneficiarios/${id}/status?novoStatus=${novoStatus}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        carregarDados();
      } else {
        alert("Erro ao tentar atualizar o status do paciente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };

  const handleExcluirReprovado = async (id: number, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir permanentemente o registo de ${nome}?`)) {
      try {
        const res = await fetch(`${API_BASE_URL}/pre-beneficiarios/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          carregarDados();
        } else {
          alert("Não foi possível apagar o registo.");
        }
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const onSubmitEnderecoTriagem = async (data: any) => {
    try {
      const payload = {
        nmLocal: "T", 
        nrCep: data.cepTriagem.replace(/\D/g, ""), 
        nmLogradouro: data.ruaTriagem,
        nrLogradouro: Number(data.numeroTriagem), 
        nmBairro: data.bairroTriagem,
        nmCidade: data.cidadeTriagem,
      };

      const res = await fetch(`${API_BASE_URL}/enderecos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Endereço de triagem cadastrado com sucesso!");
        formEnderecoTriagem.reset();
      } else {
        alert("Falha ao cadastrar o endereço.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar endereço", error);
    }
  };

  const buscarCEP = async (e: any, formMethods: any, prefix = "") => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          formMethods.setValue(`${prefix}rua`, data.logradouro);
          formMethods.setValue(`${prefix}bairro`, data.bairro);
          formMethods.setValue(`${prefix}cidade`, data.localidade);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const abrirModalCadastro = (solicitante: any) => {
    reset();
    setSolicitanteSelecionado(solicitante);
    setValue("nomeCompleto", solicitante.nmSolicitante);
    setIsModalOpen(true);
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Visão Geral" },
    { id: "novos", icon: UserPlus, label: "Novos Solicitantes" },
    { id: "triagem", icon: CalendarClock, label: "Fila de Triagem" },
    { id: "beneficiarios", icon: Users, label: "Beneficiários Ativos" },
    { id: "reprovados", icon: UserX, label: "Reprovados" },
    { id: "adicionar-triagem", icon: MapPlus, label: "Endereço de Triagem" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold">A conectar à Base de Dados BridgeCare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-600 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Atendente</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSecaoAtiva(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                secaoAtiva === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">AT</div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Atendente 01</p>
              <p className="text-xs text-slate-500">Central Base</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 w-96 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search className="text-slate-400" size={18} />
            <input type="text" placeholder="Buscar por CPF ou Nome..." className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400 text-slate-700" />
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          
          {secaoAtiva === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Bom dia, Atendente!</h2>
                  <p className="text-slate-500 mt-1">Aqui está o resumo das atividades de hoje da base de dados.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <EstatisticaCard titulo="Novos Solicitantes" valor={solicitantes.length} icone={UserPlus} cor="bg-blue-100 text-blue-600" />
                <EstatisticaCard titulo="Aguardando Triagem" valor={preBeneficiariosEmAnalise.length} icone={CalendarClock} cor="bg-amber-100 text-amber-600" />
                <EstatisticaCard titulo="Beneficiários Ativos" valor={beneficiarios.length} icone={Users} cor="bg-green-100 text-green-600" />
                <EstatisticaCard titulo="Reprovados Atuais" valor={preBeneficiariosReprovados.length} icone={UserX} cor="bg-red-100 text-red-600" />
              </div>

              <TabelaBeneficiarios aprovados={beneficiarios} />
            </div>
          )}

          {secaoAtiva === "beneficiarios" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Gestão de Beneficiários</h2>
              <TabelaBeneficiarios aprovados={beneficiarios} />
            </div>
          )}

          {secaoAtiva === "novos" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Solicitações em Análise</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {solicitantes.map((s) => (
                  <div key={s.idSolicitante} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                          <UserPlus size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg leading-tight">{s.nmSolicitante}</h4>
                          <p className="text-xs text-slate-500 mt-1">Responsável: {s.nmResponsavel || "Nenhuns"}</p>
                        </div>
                      </div>

                      {s.stLibras === "S" && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
                          <EarOff size={14} /> LIBRAS
                        </span>
                      )}
                    </div>

                    {s.stLibras === "S" ? (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">E-mail preferencial</span>
                        <span className="text-sm font-medium text-slate-700">{s.email}</span>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Telefone para Contato</span>
                        <span className="text-sm font-medium text-slate-700">{s.nrTelefone}</span>
                      </div>
                    )}

                    <button
                      onClick={() => abrirModalCadastro(s)}
                      className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                      FINALIZAR CADASTRO
                    </button>
                  </div>
                ))}
                {solicitantes.length === 0 && <p className="text-slate-500">Nenhum novo solicitante na base.</p>}
              </div>
            </div>
          )}

          {secaoAtiva === "triagem" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Aguardando Avaliação da Triagem</h2>
              <div className="grid grid-cols-1 gap-4">
                {preBeneficiariosEmAnalise.map((pb) => (
                  <div key={pb.idPreBeneficiario} className="bg-white p-6 rounded-2xl border-l-8 border-amber-400 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{pb.nmPreBeneficiario}</h4>
                      <p className="text-sm text-slate-500 mt-1"><strong>CPF:</strong> {pb.cpfPreBeneficiario}</p>
                      <p className="text-xs text-amber-600 font-bold mt-2 bg-amber-50 inline-block px-2 py-1 rounded">
                        Problema: {pb.dsProblemaDentario}
                      </p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button
                        onClick={() => atualizarStatusPreBeneficiario(pb.idPreBeneficiario, "RP")}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all"
                      >
                        <X size={18} /> Reprovar
                      </button>
                      <button
                        onClick={() => atualizarStatusPreBeneficiario(pb.idPreBeneficiario, "AP")}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                      >
                        <Check size={18} /> Aprovar
                      </button>
                    </div>
                  </div>
                ))}
                {preBeneficiariosEmAnalise.length === 0 && <p className="text-slate-500">Nenhum paciente a aguardar triagem.</p>}
              </div>
            </div>
          )}

          {secaoAtiva === "reprovados" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Solicitações Reprovadas</h2>

              {preBeneficiariosReprovados.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Nenhum reprovado na base</h3>
                  <p className="text-slate-500 mt-1">Não existem Pré-Beneficiários com status 'RP'.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {preBeneficiariosReprovados.map((s) => (
                    <div key={s.idPreBeneficiario} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                            <UserX size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg leading-tight">{s.nmPreBeneficiario}</h4>
                            <p className="text-xs text-slate-500 mt-1">CPF: {s.cpfPreBeneficiario}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="bg-red-50 text-red-600 font-bold py-2 px-4 rounded-xl border border-red-100 text-xs tracking-widest uppercase">
                          Situação: Reprovado
                        </div>
                        <button
                          onClick={() => handleExcluirReprovado(s.idPreBeneficiario, s.nmPreBeneficiario)}
                          title="Excluir Permanentemente"
                          className="w-12 h-12 shrink-0 bg-white text-slate-400 border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center active:scale-95 shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {secaoAtiva === "adicionar-triagem" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <MapPlus className="text-blue-600" size={28} /> Adicionar Endereço de Triagem
                  </h2>
                  <p className="text-slate-500 mt-1">Crie um endereço com (Local = T) para a base de dados.</p>
                </div>

                <form onSubmit={formEnderecoTriagem.handleSubmit(onSubmitEnderecoTriagem)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">CEP</label>
                      <input {...formEnderecoTriagem.register("cepTriagem", { required: true })} onBlur={(e) => buscarCEP(e, formEnderecoTriagem, "Triagem")} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500" />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Rua / Logradouro</label>
                      <input {...formEnderecoTriagem.register("ruaTriagem", { required: true })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Número</label>
                      <input {...formEnderecoTriagem.register("numeroTriagem", { required: true })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Bairro</label>
                      <input {...formEnderecoTriagem.register("bairroTriagem", { required: true })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Cidade</label>
                      <input {...formEnderecoTriagem.register("cidadeTriagem", { required: true })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4">
                    SALVAR ENDEREÇO
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* MODAL CADASTRAR PRÉ-BENEFICIÁRIO */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Finalizar Cadastro - Pré-Beneficiário
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Preencha os dados e agende a triagem.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>

              {!cadastroSucesso ? (
                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                  <div className="flex-[2] p-8 overflow-y-auto border-r border-slate-100">
                    <form
                      id="formCadastro"
                      onSubmit={handleSubmit(onSubmitCadastro)}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                          Informações Pessoais
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                            <input {...register("nomeCompleto", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Data de Nascimento</label>
                            <input type="date" {...register("dataNascimento", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">CPF</label>
                            <input placeholder="000.000.000-00" {...register("cpf", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">Sexo</label>
                            <div className="flex gap-4 p-2">
                              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="F" {...register("sexo")} className="w-4 h-4 text-blue-600" /> Feminino</label>
                              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="M" {...register("sexo")} className="w-4 h-4 text-blue-600" /> Masculino</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Endereço do Paciente</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">CEP</label>
                            <input placeholder="00000-000" {...register("cep", { required: true })} onBlur={(e) => buscarCEP(e, { setValue })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Rua / Logradouro</label>
                            <input {...register("rua", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Número</label>
                            <input id="numeroEndereco" {...register("numero", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Bairro</label>
                            <input {...register("bairro", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Cidade</label>
                            <input {...register("cidade", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Situação Odontológica</h3>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Descrição do Problema Dentário</label>
                          <textarea placeholder="Sintomas informados..." {...register("problemaDentario", { required: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none"></textarea>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <label className="block text-sm font-bold text-blue-900 mb-1">ID da Triagem Agendada</label>
                        <input placeholder="Clique numa triagem ao lado" {...register("idTriagem", { required: true })} className="w-full p-3 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-bold text-blue-700" />
                      </div>
                    </form>
                  </div>

                  {/* COLUNA DA DIREITA: TRIAGENS DISPONÍVEIS COM FORMATADORES DE DATA DO JAVA */}
                  <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6">
                      <CalendarDays className="text-blue-600" />
                      <h3 className="font-bold text-slate-900 text-lg">Triagens Disponíveis</h3>
                    </div>

                    <p className="text-sm text-slate-500 mb-6">
                      Selecione a data da triagem para atrelar ao cadastro deste Pré-Beneficiário.
                    </p>

                    <div className="space-y-4">
                      {triagens.map((triagem) => {
                        const id = triagem.idTriagem || triagem.id;

                        // FORMATADOR 1: Desempacota o LocalDate vindo como array do Java [AAAA, MM, DD]
                        const dataFormatada = Array.isArray(triagem.dtTriagem)
                          ? `${String(triagem.dtTriagem[2]).padStart(2, '0')}/${String(triagem.dtTriagem[1]).padStart(2, '0')}/${triagem.dtTriagem[0]}`
                          : (typeof triagem.dtTriagem === 'string' ? triagem.dtTriagem : "Data não informada");

                        // FORMATADOR 2: Desempacota o LocalTime vindo como array do Java [HH, MM]
                        const horaIn = Array.isArray(triagem.hrInicial)
                          ? `${String(triagem.hrInicial[0]).padStart(2, '0')}:${String(triagem.hrInicial[1]).padStart(2, '0')}`
                          : (typeof triagem.hrInicial === 'string' ? triagem.hrInicial : "");

                        const horaFi = Array.isArray(triagem.hrFinal)
                          ? `${String(triagem.hrFinal[0]).padStart(2, '0')}:${String(triagem.hrFinal[1]).padStart(2, '0')}`
                          : (typeof triagem.hrFinal === 'string' ? triagem.hrFinal : "");

                        // FORMATADOR 3: Concatena o endereço retornado pelo JOIN do TriagemDAO
                        const enderecoCompleto = triagem.nmLogradouro
                          ? `${triagem.nmLogradouro}, ${triagem.nrLogradouro} - ${triagem.nmBairro}`
                          : (triagem.nmLocal || "Endereço não retornado");

                        return (
                          <div
                            key={id}
                            onClick={() => setValue("idTriagem", id)}
                            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                ID: {id}
                              </span>
                              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">
                                Vagas: {triagem.vagas}
                              </span>
                            </div>
                            
                            <p className="font-bold text-slate-900 text-lg mb-1">{dataFormatada}</p>
                            
                            <div className="space-y-1.5 text-sm text-slate-500 mt-2">
                              {horaIn && (
                                <p className="flex items-center gap-2 font-medium text-slate-700">
                                  <Clock size={14} className="text-slate-400" /> {horaIn} às {horaFi}
                                </p>
                              )}
                              <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                                <MapPin size={14} className="text-red-400 shrink-0 mt-0.5" /> {enderecoCompleto}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      {triagens.length === 0 && <p className="text-xs text-slate-500">Não há triagens abertas no banco.</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Cadastro Finalizado!</h3>
                  <p className="text-slate-500">O solicitante foi convertido para <strong>Pré-Beneficiário</strong> com sucesso na base de dados.</p>
                </div>
              )}

              {!cadastroSucesso && (
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancelar</button>
                  <button form="formCadastro" type="submit" className="px-8 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">Salvar Cadastro no Banco</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardAtendente;