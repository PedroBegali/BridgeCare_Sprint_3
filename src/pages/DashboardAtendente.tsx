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

const ListaBeneficiarios = ({ aprovados, onExportar, onCardClick }: any) => (
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
          onClick={() => onCardClick && onCardClick(b)}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-blue-400 cursor-pointer transition-all group active:scale-[0.99]"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
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
                <Stethoscope size={14} /> Ver Histórico e Consultas
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
  const [dentistaForm, setDentistaForm] = useState({
    nmDentista: "",
    dtNascimento: "",
    sxDentista: "M",
    cpfDentista: "",
    croDentista: "",
    dsEspecialidade: "",
  });
  const [dentistaLoading, setDentistaLoading] = useState(false);
  const [dentistaErro, setDentistaErro] = useState("");
  const [dentistaSucesso, setDentistaSucesso] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [solicitantes, setSolicitantes] = useState<any[]>([]);
  const [preBeneficiarios, setPreBeneficiarios] = useState<any[]>([]);
  const [beneficiarios, setBeneficiarios] = useState<any[]>([]);
  const [triagens, setTriagens] = useState<any[]>([]);

  const [consultas, setConsultas] = useState<any[]>([]);
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [enderecos, setEnderecos] = useState<any[]>([]);

  const [modalBeneficiario, setModalBeneficiario] = useState<{
    isOpen: boolean;
    beneficiario: any;
  }>({ isOpen: false, beneficiario: null });

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

  const [modalRemarcar, setModalRemarcar] = useState<any>({
    isOpen: false,
    pb: null,
  });

  const { register, handleSubmit, setValue, reset, watch } = useForm<any>({
    defaultValues: { idProgramaSocial: "1" },
  });
  const formEnderecoTriagem = useForm();

  const idProgramaSelecionado = watch("idProgramaSocial");

  const formatarDataBR = (dt: any) => {
    if (!dt) return "--/--/----";
    if (Array.isArray(dt)) {
      return `${String(dt[2]).padStart(2, "0")}/${String(dt[1]).padStart(2, "0")}/${dt[0]}`;
    }
    if (typeof dt === "string") {
      const partes = dt.split("-");
      if (partes.length >= 3) {
        return `${partes[2].substring(0, 2)}/${partes[1]}/${partes[0]}`;
      }
    }
    return dt;
  };

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
      const [
        dadosSol,
        dadosPre,
        dadosBen,
        dadosTri,
        dadosCons,
        dadosDent,
        dadosEnd,
      ] = await Promise.all([
        fetchSeguro(`${API_BASE_URL}/solicitantes`),
        fetchSeguro(`${API_BASE_URL}/pre-beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/triagens/proximas`),
        fetchSeguro(`${API_BASE_URL}/consultas`),
        fetchSeguro(`${API_BASE_URL}/dentistas`),
        fetchSeguro(`${API_BASE_URL}/enderecos`),
      ]);

      setSolicitantes(dadosSol);
      setPreBeneficiarios(dadosPre);
      setBeneficiarios(dadosBen);
      setTriagens(dadosTri);
      setConsultas(dadosCons || []);
      setDentistas(dadosDent || []);
      setEnderecos(dadosEnd || []);
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
      const isDentistasDoBem = data.idProgramaSocial === "1";
      const isApoloniasDoBem = data.idProgramaSocial === "2";

      const nomeArquivoTermo = data.termoAutorizacao?.[0]?.name || null;
      const nomeArquivoBO = data.boletimOcorrencia?.[0]?.name || null;

      const payload = {
        nmPreBeneficiario: data.nomeCompleto,
        cpfPreBeneficiario: data.cpf.replace(/\D/g, ""),
        dtNascimento: data.dataNascimento,
        sxPreBeneficiario: data.sexo,
        dsProblemaDentario: data.problemaDentario,
        stSituacao: "AN",
        idProgramaSocial: Number(data.idProgramaSocial),
        idSolicitante: solicitanteSelecionado.idSolicitante,
        idTriagem: Number(data.idTriagem),
        vlRendaFamiliar: isDentistasDoBem ? Number(data.rendaFamiliar) : null,
        stProgramaGov: isDentistasDoBem ? data.programaGov : null,
        dsEscolaridadeResp: isDentistasDoBem ? data.escolaridade : null,
        dsTermoAutorizacao:
          isDentistasDoBem && nomeArquivoTermo ? nomeArquivoTermo : null,
        dsBoletimOcorrencia:
          isApoloniasDoBem && nomeArquivoBO ? nomeArquivoBO : null,

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
          formMethods.setValue(`rua${prefix}`, data.logradouro);
          formMethods.setValue(`bairro${prefix}`, data.bairro);
          formMethods.setValue(`cidade${prefix}`, data.localidade);
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
    {
      id: "cadastrar-dentista",
      icon: Stethoscope,
      label: "Cadastrar Dentista",
    }, // Nova seção fixa
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

  const handleCadastroDentista = async (e: React.FormEvent) => {
    e.preventDefault();
    setDentistaErro("");
    setDentistaLoading(true);
    setDentistaSucesso(false);

    const cleanCpf = dentistaForm.cpfDentista.replace(/\D/g, "");

    const payload = {
      nmDentista: dentistaForm.nmDentista,
      dtNascimento: dentistaForm.dtNascimento,
      sxDentista: dentistaForm.sxDentista,
      cpfDentista: cleanCpf,
      croDentista: dentistaForm.croDentista,
      dsEspecialidade: dentistaForm.dsEspecialidade,
      stDentista: "A", // 'A' de Ativo por padrão
    };

    try {
      const response = await fetch(`${API_BASE_URL}/dentistas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setDentistaSucesso(true);
        setDentistaForm({
          nmDentista: "",
          dtNascimento: "",
          sxDentista: "M",
          cpfDentista: "",
          croDentista: "",
          dsEspecialidade: "",
        });
      } else {
        const errorText = await response.text();
        setDentistaErro(
          errorText || "Ocorreu um erro ao cadastrar o dentista.",
        );
      }
    } catch (error) {
      console.error(error);
      setDentistaErro("Não foi possível conectar com o servidor do back-end.");
    } finally {
      setDentistaLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <ConfirmModal
        isOpen={modalConfirm.isOpen}
        config={modalConfirm.config}
        onCancel={() => setModalConfirm({ ...modalConfirm, isOpen: false })}
        onConfirm={modalConfirm.onConfirm}
      />

      {modalRemarcar.isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900">
                Remarcar Triagem
              </h2>
              <button
                onClick={() => setModalRemarcar({ isOpen: false, pb: null })}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Selecione a Nova Triagem
              </label>
              <select
                id="selectNovaTriagem"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
              >
                <option value="">Selecione...</option>
                {triagens.map((t) => {
                  const id = t.idTriagem || t.id;
                  const dataFormatada = formatarDataBR(t.dtTriagem);
                  return (
                    <option key={id} value={id}>
                      {dataFormatada} - {t.nmLogradouro || t.nmLocal}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={async () => {
                  const select = document.getElementById(
                    "selectNovaTriagem",
                  ) as HTMLSelectElement;
                  if (!select.value) return;
                  try {
                    const payload = {
                      ...modalRemarcar.pb,
                      idTriagem: Number(select.value),
                    };
                    await fetch(
                      `${API_BASE_URL}/pre-beneficiarios/${modalRemarcar.pb.idPreBeneficiario}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      },
                    );
                    carregarDados();
                    setModalRemarcar({ isOpen: false, pb: null });
                  } catch (e) {}
                }}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                CONFIRMAR REAGENDAMENTO
              </button>
            </div>
          </div>
        </div>
      )}

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
                onCardClick={(b: any) =>
                  setModalBeneficiario({ isOpen: true, beneficiario: b })
                }
              />
            </div>
          )}

          {secaoAtiva === "beneficiarios" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <ListaBeneficiarios
                aprovados={beneficiariosFiltrados}
                onExportar={exportarRelatorioCSV}
                onCardClick={(b: any) =>
                  setModalBeneficiario({ isOpen: true, beneficiario: b })
                }
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
                {preBeneficiariosEmAnaliseFiltrados.map((pb) => {
                  const triagemValida = triagens.find(
                    (t) => (t.idTriagem || t.id) === pb.idTriagem,
                  );

                  return (
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
                        {!triagemValida && (
                          <button
                            onClick={() =>
                              setModalRemarcar({ isOpen: true, pb })
                            }
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 px-6 py-4 rounded-xl font-black hover:bg-blue-50 transition-all active:scale-[0.98]"
                          >
                            <CalendarClock size={18} /> Remarcar
                          </button>
                        )}
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
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-green-200 text-green-600 px-6 py-4 rounded-xl font-black hover:bg-green-50 transition-all active:scale-[0.98]"
                        >
                          <Check size={18} /> Aprovar
                        </button>
                      </div>
                    </div>
                  );
                })}
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

          {secaoAtiva === "cadastrar-dentista" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Stethoscope className="text-blue-600" size={28} />{" "}
                    Cadastrar Novo Dentista
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Adicione um profissional parceiro na base BridgeCare.
                  </p>
                </div>

                {!dentistaSucesso ? (
                  <form onSubmit={handleCadastroDentista} className="space-y-8">
                    <div>
                      <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                        Dados do Profissional
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Nome Completo
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            placeholder="Dr(a). Nome Sobrenome"
                            value={dentistaForm.nmDentista}
                            onChange={(e) =>
                              setDentistaForm({
                                ...dentistaForm,
                                nmDentista: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            CPF
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={14}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            placeholder="000.000.000-00"
                            value={dentistaForm.cpfDentista}
                            onChange={(e) =>
                              setDentistaForm({
                                ...dentistaForm,
                                cpfDentista: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Data Nasc.
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
                            value={dentistaForm.dtNascimento}
                            onChange={(e) =>
                              setDentistaForm({
                                ...dentistaForm,
                                dtNascimento: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Gênero
                          </label>
                          <select
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
                            value={dentistaForm.sxDentista}
                            onChange={(e) =>
                              setDentistaForm({
                                ...dentistaForm,
                                sxDentista: e.target.value,
                              })
                            }
                          >
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                          </select>
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            CRO
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            placeholder="CRO-SP 0000"
                            value={dentistaForm.croDentista}
                            onChange={(e) =>
                              setDentistaForm({
                                ...dentistaForm,
                                croDentista: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Especialidade
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                            placeholder="Ortodontia..."
                            value={dentistaForm.dsEspecialidade}
                            onChange={(e) =>
                              setDentistaForm({
                                ...dentistaForm,
                                dsEspecialidade: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {dentistaErro && (
                      <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-bold text-center p-3 rounded-xl">
                        {dentistaErro}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={dentistaLoading}
                      className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4 tracking-wider disabled:opacity-70"
                    >
                      {dentistaLoading ? "SALVANDO..." : "SALVAR DENTISTA"}
                    </button>
                  </form>
                ) : (
                  <div className="p-12 text-center flex flex-col items-center justify-center min-h-75">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 animate-in zoom-in">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      Dentista Cadastrado!
                    </h3>
                    <p className="text-slate-500">
                      O profissional foi registrado e vinculado com sucesso na
                      base de dados.
                    </p>
                    <button
                      type="button"
                      onClick={() => setDentistaSucesso(false)}
                      className="mt-6 px-6 py-3 font-bold text-sm text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cadastrar outro profissional
                    </button>
                  </div>
                )}
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
                          Programa Social
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Selecione o Programa</label>
                            <select
                              {...register("idProgramaSocial", { required: true })}
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
                            >
                              <option value="1">Dentistas do Bem</option>
                              <option value="2">Apolônias do Bem</option>
                            </select>
                          </div>

                          {idProgramaSelecionado === "1" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Renda Familiar (R$)</label>
                                <input type="number" step="0.01" {...register("rendaFamiliar")} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500" placeholder="Ex: 2500.00" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Escolaridade do Responsável</label>
                                <select {...register("escolaridade")} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500">
                                  <option value="Fundamental Incompleto">Ensino Fundamental Incompleto</option>
                                  <option value="Fundamental Completo">Ensino Fundamental Completo</option>
                                  <option value="Médio Incompleto">Ensino Médio Incompleto</option>
                                  <option value="Médio Completo">Ensino Médio Completo</option>
                                  <option value="Superior">Ensino Superior</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Possui Programa do Governo?</label>
                                <div className="flex gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100 px-6 py-4">
                                  <label className="flex items-center gap-3 text-sm font-bold cursor-pointer">
                                    <input type="radio" value="S" {...register("programaGov")} className="w-5 h-5 text-blue-600" /> Sim
                                  </label>
                                  <label className="flex items-center gap-3 text-sm font-bold cursor-pointer">
                                    <input type="radio" value="N" defaultChecked {...register("programaGov")} className="w-5 h-5 text-blue-600" /> Não
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Anexar Termo de Autorização</label>
                                <input type="file" accept=".pdf,image/*" {...register("termoAutorizacao")} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                              </div>
                            </div>
                          )}

                          {idProgramaSelecionado === "2" && (
                            <div className="animate-in fade-in">
                              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Anexar Boletim de Ocorrência</label>
                              <input type="file" accept=".pdf,image/*" {...register("boletimOcorrencia")} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            </div>
                          )}
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
                        const dataFormatada = formatarDataBR(triagem.dtTriagem);

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
        {modalBeneficiario.isOpen && modalBeneficiario.beneficiario && (
          <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="flex justify-between items-center p-6 md:px-8 border-b border-slate-100 bg-slate-50 shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Users className="text-blue-600" size={28} /> Painel de
                    Tratamento
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Paciente:{" "}
                    <strong className="text-slate-700">
                      {modalBeneficiario.beneficiario.nmPreBeneficiario}
                    </strong>{" "}
                    (CPF: {modalBeneficiario.beneficiario.cpfPreBeneficiario})
                  </p>
                </div>
                <button
                  onClick={() =>
                    setModalBeneficiario({ isOpen: false, beneficiario: null })
                  }
                  className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm hover:shadow-md"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto bg-slate-50 flex-1">
                {(() => {
                  const hoje = new Date();
                  hoje.setHours(0, 0, 0, 0);

                  const pacienteConsultas = consultas.filter(
                    (c) =>
                      c.idBeneficiario ===
                      modalBeneficiario.beneficiario.idBeneficiario,
                  );

                  const parseData = (dt: any) => {
                    if (!dt) return new Date(0);
                    if (Array.isArray(dt))
                      return new Date(dt[0], dt[1] - 1, dt[2]);
                    const partes = dt.split("-");
                    if (partes.length === 3)
                      return new Date(
                        Number(partes[0]),
                        Number(partes[1]) - 1,
                        Number(partes[2]),
                      );
                    return new Date(dt);
                  };

                  const formatTime = (hr: any) => {
                    if (!hr) return "--:--";
                    if (Array.isArray(hr))
                      return `${String(hr[0]).padStart(2, "0")}:${String(hr[1]).padStart(2, "0")}`;
                    if (typeof hr === "string") return hr.substring(0, 5);
                    return hr;
                  };

                  const passadas = pacienteConsultas
                    .filter((c) => parseData(c.dtConsulta) < hoje)
                    .sort(
                      (a, b) =>
                        parseData(b.dtConsulta).getTime() -
                        parseData(a.dtConsulta).getTime(),
                    );
                  const futuras = pacienteConsultas
                    .filter((c) => parseData(c.dtConsulta) >= hoje)
                    .sort(
                      (a, b) =>
                        parseData(a.dtConsulta).getTime() -
                        parseData(b.dtConsulta).getTime(),
                    );

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                          <CalendarClock className="text-blue-500" size={22} />{" "}
                          Próximas Consultas
                        </h3>
                        <div className="space-y-4">
                          {futuras.length === 0 ? (
                            <p className="text-sm text-slate-500 font-medium bg-white p-6 rounded-2xl border border-slate-200 text-center">
                              O paciente não possui retornos agendados.
                            </p>
                          ) : (
                            futuras.map((c) => {
                              const dataFormatada = formatarDataBR(
                                c.dtConsulta,
                              );

                              const dentistaConsulta = dentistas.find(
                                (d) =>
                                  Number(
                                    d.idDentista || d.id_dentista || d.id,
                                  ) === Number(c.idDentista || c.id_dentista),
                              );
                              const nomeDentista = dentistaConsulta
                                ? dentistaConsulta.nmDentista ||
                                  "Sem Nome Cadastrado"
                                : "Profissional não encontrado";

                              const enderecoConsulta = enderecos.find(
                                (e) =>
                                  Number(
                                    e.idEndereco || e.id_endereco || e.id,
                                  ) === Number(c.idEndereco || c.id_endereco),
                              );
                              const localConsulta = enderecoConsulta
                                ? enderecoConsulta.nmLogradouro
                                  ? `${enderecoConsulta.nmLogradouro}, ${enderecoConsulta.nrLogradouro} - ${enderecoConsulta.nmBairro}`
                                  : enderecoConsulta.nmLocal
                                : "Local não informado";

                              return (
                                <div
                                  key={c.idConsulta}
                                  className="bg-white p-5 rounded-2xl border-l-4 border-blue-500 shadow-sm relative overflow-hidden group"
                                >
                                  <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <CalendarClock size={60} />
                                  </div>
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="font-black text-slate-700 text-lg">
                                      {dataFormatada}
                                    </span>
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
                                      Agendada
                                    </span>
                                  </div>

                                  <div className="flex flex-col gap-1.5 mt-4 mb-2 bg-slate-50 p-3 rounded-xl border border-slate-100 relative z-10">
                                    <p className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                      <Clock
                                        size={14}
                                        className="text-blue-400"
                                      />
                                      <strong className="text-slate-700">
                                        Horário:
                                      </strong>{" "}
                                      {formatTime(c.hrConsulta)}
                                    </p>
                                    <p className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                      <Stethoscope
                                        size={14}
                                        className="text-slate-400"
                                      />
                                      <strong className="text-slate-700">
                                        Dentista:
                                      </strong>{" "}
                                      {nomeDentista}
                                    </p>
                                    <p className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                                      <MapPin
                                        size={14}
                                        className="text-slate-400 shrink-0 mt-0.5"
                                      />
                                      <strong className="text-slate-700">
                                        Local:
                                      </strong>{" "}
                                      {localConsulta}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                          <Stethoscope className="text-emerald-500" size={22} />{" "}
                          Histórico e Prontuários
                        </h3>
                        <div className="space-y-4">
                          {passadas.length === 0 ? (
                            <p className="text-sm text-slate-500 font-medium bg-white p-6 rounded-2xl border border-slate-200 text-center">
                              Nenhum histórico de consulta clínica preenchido.
                            </p>
                          ) : (
                            passadas.map((c) => {
                              const dataFormatada = formatarDataBR(
                                c.dtConsulta,
                              );
                              const recomendacao =
                                c.dsRecomendacao || c.ds_recomendacao;

                              const dentistaConsulta = dentistas.find(
                                (d) => (d.idDentista || d.id) === c.idDentista,
                              );
                              const nomeDentista = dentistaConsulta
                                ? dentistaConsulta.nmDentista
                                : "Profissional não encontrado";

                              const enderecoConsulta = enderecos.find(
                                (e) => (e.idEndereco || e.id) === c.idEndereco,
                              );
                              const localConsulta = enderecoConsulta
                                ? enderecoConsulta.nmLogradouro
                                  ? `${enderecoConsulta.nmLogradouro}, ${enderecoConsulta.nrLogradouro} - ${enderecoConsulta.nmBairro}`
                                  : enderecoConsulta.nmLocal
                                : "Local não informado";

                              return (
                                <div
                                  key={c.idConsulta}
                                  className="bg-white p-5 rounded-2xl border-l-4 border-emerald-500 shadow-sm"
                                >
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                      <span className="font-black text-slate-700 text-lg">
                                        {dataFormatada}
                                      </span>
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
                                      Concluída
                                    </span>
                                  </div>

                                  <div className="flex flex-col gap-1.5 mb-4 text-xs text-slate-500 font-medium pb-4 border-b border-slate-100">
                                    <p className="flex items-center gap-2">
                                      <Stethoscope
                                        size={14}
                                        className="text-emerald-400"
                                      />{" "}
                                      Atendido por:{" "}
                                      <strong className="text-slate-700">
                                        {nomeDentista}
                                      </strong>
                                    </p>
                                    <p className="flex items-start gap-2">
                                      <MapPin
                                        size={14}
                                        className="text-slate-400 shrink-0"
                                      />{" "}
                                      Local:{" "}
                                      <strong className="text-slate-700">
                                        {localConsulta}
                                      </strong>
                                    </p>
                                  </div>

                                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                                      Relatório Clínico (Prontuário)
                                    </p>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                      {c.dsProntuario ||
                                        "Sem registro escrito no prontuário."}
                                    </p>
                                  </div>

                                  {recomendacao && (
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">
                                        Prescrição / Recomendação
                                      </p>
                                      <p className="text-sm text-amber-800 leading-relaxed font-medium">
                                        {recomendacao}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardAtendente;
