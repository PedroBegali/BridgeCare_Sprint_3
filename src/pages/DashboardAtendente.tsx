import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  UserPlus,
  Users,
  CalendarClock,
  Search,
  EarOff,
  LayoutDashboard,
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
  AlertTriangle,
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

const ConfirmModal = ({ isOpen, config, onCancel, onConfirm }: any) => {
  if (!isOpen) return null;

  const styleMap = {
    danger: {
      bg: "bg-red-600 hover:bg-red-700",
      icon: "text-red-600 bg-red-100",
      border: "border-red-200",
    },
    success: {
      bg: "bg-green-600 hover:bg-green-700",
      icon: "text-green-600 bg-green-100",
      border: "border-green-200",
    },
  };

  const currentStyle = styleMap[config.type as "danger" | "success"];

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-8 text-center flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${currentStyle.icon}`}
          >
            <AlertTriangle size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">
            {config.title}
          </h3>
          <p className="text-slate-500 leading-relaxed">{config.message}</p>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className={`flex-1 px-6 py-3 font-black text-white rounded-xl shadow-lg transition-all active:scale-95 ${currentStyle.bg}`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const ListaBeneficiarios = ({ aprovados, onExportar }: any) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h3 className="font-bold text-slate-900 text-xl">
        Beneficiários Ativos na Plataforma
      </h3>
      <button
        onClick={onExportar}
        className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-all border border-transparent hover:border-blue-100"
      >
        <Download size={16} /> Exportar Relatório
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {aprovados.map((b: any) => (
        <div
          key={b.idBeneficiario}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg leading-tight">
                  {b.nmPreBeneficiario}
                </h4>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  CPF: {b.cpfPreBeneficiario}
                </p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
              ATIVO
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Acompanhamento
              </span>
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
                <Stethoscope size={14} /> Atendimento Vinculado
              </span>
            </div>
            <div className="w-full h-px bg-slate-200/60"></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Situação Cadastral
              </span>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Check size={14} className="text-green-500" /> Aprovado na
                Triagem
              </span>
            </div>
          </div>
        </div>
      ))}

      {aprovados.length === 0 && (
        <div className="col-span-1 lg:col-span-2 bg-white p-16 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Users size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Nenhum beneficiário encontrado
          </h3>
          <p className="text-slate-500 mt-2 max-w-sm">
            Tente limpar a sua busca ou adicione novos pacientes aprovando-os na
            triagem.
          </p>
        </div>
      )}
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

  const [termoBusca, setTermoBusca] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [solicitanteSelecionado, setSolicitanteSelecionado] =
    useState<any>(null);

  const [modalConfirm, setModalConfirm] = useState({
    isOpen: false,
    config: {},
    onConfirm: () => {},
  });

  const { register, handleSubmit, setValue, reset } = useForm();
  const formEnderecoTriagem = useForm();

  const fetchSeguro = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error(`Falha ao buscar ${url}:`, err);
      return [];
    }
  };

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [dadosSol, dadosPre, dadosBen, dadosTri] = await Promise.all([
        fetchSeguro(`${API_BASE_URL}/solicitantes`),
        fetchSeguro(`${API_BASE_URL}/pre-beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/triagens/proximas`),
      ]);

      setSolicitantes(dadosSol);
      setPreBeneficiarios(dadosPre);
      setBeneficiarios(dadosBen);
      setTriagens(dadosTri);
    } catch (error) {
      console.error("Erro inesperado no Promise.all:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const filtroBusca = (item: any) => {
    if (!termoBusca) return true;
    const termo = termoBusca.toLowerCase();
    const nome = (
      item.nmPreBeneficiario ||
      item.nmSolicitante ||
      ""
    ).toLowerCase();
    const cpf = (item.cpfPreBeneficiario || item.cpf || "").replace(/\D/g, "");
    const buscaCpf = termo.replace(/\D/g, "");
    return nome.includes(termo) || (buscaCpf && cpf.includes(buscaCpf));
  };

  const solicitantesFiltrados = solicitantes.filter(filtroBusca);
  const beneficiariosFiltrados = beneficiarios.filter(filtroBusca);
  const preBeneficiariosEmAnaliseFiltrados = preBeneficiarios
    .filter((pb) => pb.stSituacao === "AN")
    .filter(filtroBusca);
  const preBeneficiariosReprovadosFiltrados = preBeneficiarios
    .filter((pb) => pb.stSituacao === "RP")
    .filter(filtroBusca);

  const exportarRelatorioCSV = () => {
    if (beneficiariosFiltrados.length === 0) {
      alert("Não há dados para exportar com o filtro atual.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,ID,Nome,CPF,Situação\n";
    beneficiariosFiltrados.forEach((b: any) => {
      csvContent += `${b.idBeneficiario},${b.nmPreBeneficiario},${b.cpfPreBeneficiario},ATIVO\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "beneficiarios_ativos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const atualizarStatusPreBeneficiario = async (
    id: number,
    novoStatus: "AP" | "RP",
  ) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/pre-beneficiarios/${id}/status?novoStatus=${novoStatus}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (res.ok) {
        carregarDados();
      } else {
        alert("Erro ao tentar atualizar o status do paciente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };

  const handleExcluirReprovadoConfirmed = async (id: number) => {
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
  };

  const onSubmitEnderecoTriagem = async (data: any) => {
    try {
      const payloadEndereco = {
        nmLocal: "T",
        nrCep: data.cepTriagem.replace(/\D/g, ""),
        nmLogradouro: data.ruaTriagem,
        nrLogradouro: Number(data.numeroTriagem),
        nmBairro: data.bairroTriagem,
        nmCidade: data.cidadeTriagem,
      };

      const resEndereco = await fetch(`${API_BASE_URL}/enderecos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadEndereco),
      });

      if (resEndereco.ok) {
        const todosEnderecos = await fetchSeguro(`${API_BASE_URL}/enderecos`);
        const enderecoCriado = todosEnderecos
          .reverse()
          .find(
            (e: any) =>
              e.nmLogradouro === data.ruaTriagem &&
              e.nrLogradouro === Number(data.numeroTriagem),
          );

        if (enderecoCriado) {
          const payloadTriagem = {
            dtTriagem: data.dataTriagem,
            hrInicial: data.horaInicial + ":00",
            hrFinal: data.horaFinal + ":00",
            idEndereco: enderecoCriado.idEndereco,
            vagas: Number(data.vagasTriagem) || 10,
          };

          const resTriagem = await fetch(`${API_BASE_URL}/triagens`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadTriagem),
          });

          if (resTriagem.ok) {
            alert(
              "Endereço e Triagem cadastrados com sucesso na base de dados!",
            );
            formEnderecoTriagem.reset();
            carregarDados();
          } else {
            alert(
              "Endereço cadastrado, mas falha ao gerar o evento de Triagem.",
            );
          }
        }
      } else {
        alert("Falha ao cadastrar o endereço.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar triagem", error);
    }
  };

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
      }
    } catch (error) {
      console.error(error);
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
      } catch (error) {}
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
    { id: "adicionar-triagem", icon: MapPlus, label: "Adicionar Triagem" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold">
            Conectando-se à Base de Dados BridgeCare...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <ConfirmModal
        isOpen={modalConfirm.isOpen}
        config={modalConfirm.config}
        onCancel={() => setModalConfirm({ ...modalConfirm, isOpen: false })}
        onConfirm={modalConfirm.onConfirm}
      />

      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-600 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            Atendente
          </p>
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
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 w-96 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search className="text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por CPF ou Nome..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400 text-slate-700"
            />
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {secaoAtiva === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Seja Bem-Vindo, Atendente!
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Aqui está o resumo das atividades.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <EstatisticaCard
                  titulo="Novos Solicitantes"
                  valor={solicitantes.length}
                  icone={UserPlus}
                  cor="bg-blue-100 text-blue-600"
                />
                <EstatisticaCard
                  titulo="Aguardando Triagem"
                  valor={
                    preBeneficiarios.filter((pb) => pb.stSituacao === "AN")
                      .length
                  }
                  icone={CalendarClock}
                  cor="bg-amber-100 text-amber-600"
                />
                <EstatisticaCard
                  titulo="Beneficiários Ativos"
                  valor={beneficiarios.length}
                  icone={Users}
                  cor="bg-green-100 text-green-600"
                />
                <EstatisticaCard
                  titulo="Reprovados Atuais"
                  valor={
                    preBeneficiarios.filter((pb) => pb.stSituacao === "RP")
                      .length
                  }
                  icone={UserX}
                  cor="bg-red-100 text-red-600"
                />
              </div>

              <ListaBeneficiarios
                aprovados={beneficiariosFiltrados}
                onExportar={exportarRelatorioCSV}
              />
            </div>
          )}

          {secaoAtiva === "beneficiarios" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <ListaBeneficiarios
                aprovados={beneficiariosFiltrados}
                onExportar={exportarRelatorioCSV}
              />
            </div>
          )}

          {secaoAtiva === "novos" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Solicitações em Análise
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {solicitantesFiltrados.map((s) => (
                  <div
                    key={s.idSolicitante}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                          <UserPlus size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-lg leading-tight">
                            {s.nmSolicitante}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 font-medium">
                            Responsável: {s.nmResponsavel || "Nenhum"}
                          </p>
                        </div>
                      </div>

                      {s.stLibras === "S" && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
                          <EarOff size={14} /> LIBRAS
                        </span>
                      )}
                    </div>

                    {s.stLibras === "S" ? (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          E-mail preferencial
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                          {s.email}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Telefone para Contato
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                          {s.nrTelefone}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => abrirModalCadastro(s)}
                      className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                      FINALIZAR CADASTRO
                    </button>
                  </div>
                ))}
                {solicitantesFiltrados.length === 0 && (
                  <div className="col-span-1 lg:col-span-2 bg-white p-12 rounded-3xl border border-slate-200 text-center">
                    <p className="text-slate-500 font-bold">
                      Nenhum solicitante encontrado com essa busca.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {secaoAtiva === "triagem" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Aguardando Avaliação da Triagem
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {preBeneficiariosEmAnaliseFiltrados.map((pb) => (
                  <div
                    key={pb.idPreBeneficiario}
                    className="bg-white p-6 rounded-3xl border-l-8 border-amber-400 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all"
                  >
                    <div>
                      <h4 className="text-xl font-black text-slate-900">
                        {pb.nmPreBeneficiario}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        CPF: {pb.cpfPreBeneficiario}
                      </p>
                      <p className="text-xs text-amber-700 font-bold mt-3 bg-amber-50 inline-block px-3 py-1.5 rounded-lg border border-amber-100">
                        Descrição odontológica: {pb.dsProblemaDentario}
                      </p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                      <button
                        onClick={() =>
                          setModalConfirm({
                            isOpen: true,
                            config: {
                              type: "danger",
                              title: "Reprovar Paciente",
                              message: `Tem certeza que deseja REPROVAR o paciente ${pb.nmPreBeneficiario}? Esta ação atualizará o status dele para "RP".`,
                            },
                            onConfirm: () =>
                              atualizarStatusPreBeneficiario(
                                pb.idPreBeneficiario,
                                "RP",
                              ),
                          })
                        }
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 px-6 py-4 rounded-xl font-black hover:bg-red-50 transition-all active:scale-[0.98]"
                      >
                        <X size={18} /> Reprovar
                      </button>
                      <button
                        onClick={() =>
                          setModalConfirm({
                            isOpen: true,
                            config: {
                              type: "success",
                              title: "Aprovar Paciente",
                              message: `Tem certeza que deseja APROVAR o paciente ${pb.nmPreBeneficiario}? Ele será convertido num Beneficiário Ativo.`,
                            },
                            onConfirm: () =>
                              atualizarStatusPreBeneficiario(
                                pb.idPreBeneficiario,
                                "AP",
                              ),
                          })
                        }
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-xl font-black hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-[0.98]"
                      >
                        <Check size={18} /> Aprovar
                      </button>
                    </div>
                  </div>
                ))}
                {preBeneficiariosEmAnaliseFiltrados.length === 0 && (
                  <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
                    <p className="text-slate-500 font-bold">
                      Nenhum paciente a aguardar triagem ou encontrado na busca.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {secaoAtiva === "reprovados" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Solicitações Reprovadas
              </h2>

              {preBeneficiariosReprovadosFiltrados.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Nenhum reprovado encontrado
                  </h3>
                  <p className="text-slate-500 mt-1">
                    Sua busca ou a base de reprovados está vazia.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {preBeneficiariosReprovadosFiltrados.map((s) => (
                    <div
                      key={s.idPreBeneficiario}
                      className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between transition-all"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                            <UserX size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 text-lg leading-tight">
                              {s.nmPreBeneficiario}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 font-medium">
                              CPF: {s.cpfPreBeneficiario}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto bg-white p-2 pl-4 pr-2 rounded-2xl border border-slate-100">
                        <div className="text-red-600 font-bold text-[10px] tracking-widest uppercase">
                          Situação: Reprovado
                        </div>
                        <button
                          onClick={() =>
                            setModalConfirm({
                              isOpen: true,
                              config: {
                                type: "danger",
                                title: "Exclusão Permanente",
                                message: `Tem certeza que deseja DELETAR o paciente ${s.nmPreBeneficiario} do banco de dados? Esta ação não pode ser desfeita.`,
                              },
                              onConfirm: () =>
                                handleExcluirReprovadoConfirmed(
                                  s.idPreBeneficiario,
                                ),
                            })
                          }
                          title="Excluir Permanentemente"
                          className="w-10 h-10 shrink-0 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center active:scale-95"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {secaoAtiva === "adicionar-triagem" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <MapPlus className="text-blue-600" size={28} /> Cadastrar
                    Nova Triagem
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Crie um endereço de atendimento e defina os horários do
                    evento na base de dados.
                  </p>
                </div>

                <form
                  onSubmit={formEnderecoTriagem.handleSubmit(
                    onSubmitEnderecoTriagem,
                  )}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                      Local da Triagem (Endereço)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          CEP
                        </label>
                        <input
                          {...formEnderecoTriagem.register("cepTriagem", {
                            required: true,
                          })}
                          onBlur={(e) =>
                            buscarCEP(e, formEnderecoTriagem, "Triagem")
                          }
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Rua / Logradouro
                        </label>
                        <input
                          {...formEnderecoTriagem.register("ruaTriagem", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Número
                        </label>
                        <input
                          {...formEnderecoTriagem.register("numeroTriagem", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Bairro
                        </label>
                        <input
                          {...formEnderecoTriagem.register("bairroTriagem", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Cidade
                        </label>
                        <input
                          {...formEnderecoTriagem.register("cidadeTriagem", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                      Detalhes do Evento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Data da Triagem
                        </label>
                        <input
                          type="date"
                          {...formEnderecoTriagem.register("dataTriagem", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Hora Início
                        </label>
                        <input
                          type="time"
                          {...formEnderecoTriagem.register("horaInicial", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Hora Final
                        </label>
                        <input
                          type="time"
                          {...formEnderecoTriagem.register("horaFinal", {
                            required: true,
                          })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4 tracking-wider"
                  >
                    SALVAR ENDEREÇO E CRIAR TRIAGEM
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="flex justify-between items-center p-6 md:px-8 border-b border-slate-100 bg-slate-50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Finalizar Cadastro - Pré-Beneficiário
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Preencha os dados e agende a triagem do paciente.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm hover:shadow-md"
                >
                  <X size={20} />
                </button>
              </div>

              {!cadastroSucesso ? (
                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                  <div className="flex-2 p-8 overflow-y-auto border-r border-slate-100">
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
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Nome Completo
                            </label>
                            <input
                              {...register("nomeCompleto", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Data de Nascimento
                            </label>
                            <input
                              type="date"
                              {...register("dataNascimento", {
                                required: true,
                              })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium text-slate-700"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              CPF
                            </label>
                            <input
                              placeholder="000.000.000-00"
                              {...register("cpf", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Sexo
                            </label>
                            <div className="flex gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100 px-6 py-4">
                              <label className="flex items-center gap-3 text-sm font-bold cursor-pointer">
                                <input
                                  type="radio"
                                  value="F"
                                  {...register("sexo")}
                                  className="w-5 h-5 text-blue-600"
                                />{" "}
                                Feminino
                              </label>
                              <label className="flex items-center gap-3 text-sm font-bold cursor-pointer">
                                <input
                                  type="radio"
                                  value="M"
                                  {...register("sexo")}
                                  className="w-5 h-5 text-blue-600"
                                />{" "}
                                Masculino
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 mt-8">
                          Endereço do Paciente
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              CEP
                            </label>
                            <input
                              placeholder="00000-000"
                              {...register("cep", { required: true })}
                              onBlur={(e) => buscarCEP(e, { setValue })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Rua / Logradouro
                            </label>
                            <input
                              {...register("rua", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Número
                            </label>
                            <input
                              id="numeroEndereco"
                              {...register("numero", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Bairro
                            </label>
                            <input
                              {...register("bairro", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                              Cidade
                            </label>
                            <input
                              {...register("cidade", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 mt-8">
                          Situação Clínica
                        </h3>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Descrição do Problema
                        </label>
                        <textarea
                          placeholder="Sintomas e histórico informado..."
                          {...register("problemaDentario", { required: true })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 resize-none h-24"
                        ></textarea>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
                        <label className="block text-xs font-black text-blue-900 mb-2 uppercase tracking-widest">
                          ID da Triagem Agendada
                        </label>
                        <input
                          placeholder="Clique numa triagem no painel lateral 👉"
                          {...register("idTriagem", { required: true })}
                          className="w-full p-4 bg-white border border-blue-200 rounded-2xl outline-none focus:border-blue-500 font-bold text-blue-700 placeholder:text-blue-300"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="flex-1 bg-slate-50 p-8 overflow-y-auto border-l border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                        <CalendarDays size={20} />
                      </div>
                      <h3 className="font-black text-slate-900 text-lg">
                        Triagens Disponíveis
                      </h3>
                    </div>

                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                      Selecione a data da triagem para atrelar ao cadastro deste
                      Pré-Beneficiário clicando sobre o card desejado.
                    </p>

                    <div className="space-y-4">
                      {triagens.map((triagem) => {
                        const id = triagem.idTriagem || triagem.id;

                        const dataFormatada = Array.isArray(triagem.dtTriagem)
                          ? `${String(triagem.dtTriagem[2]).padStart(2, "0")}/${String(triagem.dtTriagem[1]).padStart(2, "0")}/${triagem.dtTriagem[0]}`
                          : typeof triagem.dtTriagem === "string"
                            ? triagem.dtTriagem
                            : "Data não informada";

                        const horaIn = Array.isArray(triagem.hrInicial)
                          ? `${String(triagem.hrInicial[0]).padStart(2, "0")}:${String(triagem.hrInicial[1]).padStart(2, "0")}`
                          : typeof triagem.hrInicial === "string"
                            ? triagem.hrInicial
                            : "";

                        const horaFi = Array.isArray(triagem.hrFinal)
                          ? `${String(triagem.hrFinal[0]).padStart(2, "0")}:${String(triagem.hrFinal[1]).padStart(2, "0")}`
                          : typeof triagem.hrFinal === "string"
                            ? triagem.hrFinal
                            : "";

                        const enderecoCompleto = triagem.nmLogradouro
                          ? `${triagem.nmLogradouro}, ${triagem.nrLogradouro} - ${triagem.nmBairro}`
                          : triagem.nmLocal || "Endereço não retornado";

                        return (
                          <div
                            key={id}
                            onClick={() => setValue("idTriagem", id)}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex justify-between items-start mb-4">
                              <span className="bg-slate-100 text-slate-500 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                ID: {id}
                              </span>
                              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-widest border border-blue-100">
                                {triagem.vagas} VAGAS
                              </span>
                            </div>

                            <p className="font-black text-slate-900 text-xl mb-1">
                              {dataFormatada}
                            </p>

                            <div className="space-y-2 text-sm text-slate-500 mt-3 pt-3 border-t border-slate-100">
                              {horaIn && (
                                <p className="flex items-center gap-2 font-bold text-slate-700">
                                  <Clock size={14} className="text-slate-400" />{" "}
                                  {horaIn} às {horaFi}
                                </p>
                              )}
                              <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 font-medium">
                                <MapPin
                                  size={14}
                                  className="text-red-400 shrink-0 mt-0.5"
                                />{" "}
                                {enderecoCompleto}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      {triagens.length === 0 && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                          <p className="text-sm font-bold text-slate-500">
                            Nenhuma triagem futura aberta.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-16 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
                    <CheckCircle2 size={56} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">
                    Cadastro Finalizado!
                  </h3>
                  <p className="text-slate-500 text-lg">
                    O solicitante foi convertido para{" "}
                    <strong>Pré-Beneficiário</strong> com sucesso na base de
                    dados.
                  </p>
                </div>
              )}

              {!cadastroSucesso && (
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4 md:px-8">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    form="formCadastro"
                    type="submit"
                    className="px-10 py-4 font-black text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 tracking-wide"
                  >
                    SALVAR CADASTRO
                  </button>
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
