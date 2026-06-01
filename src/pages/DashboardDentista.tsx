import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Search,
  User,
  Package,
  ClipboardList,
  LayoutDashboard,
  CheckCircle2,
  X,
  Clock,
  MapPin,
  Stethoscope,
  Send,
  MessageSquarePlus,
  CalendarPlus,
  AlertTriangle,
  LogOut,
  MessageCircle
} from "lucide-react";
import { ChatComponent } from "../components/ChatComponent";

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

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-orange-600 bg-orange-100">
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
            className="flex-1 px-6 py-3 font-black text-white rounded-xl shadow-lg transition-all active:scale-95 bg-blue-600 hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const CardAgenda = ({
  consulta,
  pacienteNome,
  data,
  hora,
  onRecarregar,
  onAbrirChat,
}: any) => {
  const [recomendacao, setRecomendacao] = useState(
    consulta.dsRecomendacao || "",
  );
  const [enviando, setEnviando] = useState(false);
  const [modalConfirmRec, setModalConfirmRec] = useState(false);

  const enviarRecomendacao = async () => {
    if (!recomendacao.trim()) return;
    setEnviando(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/consultas/${consulta.idConsulta}/recomendacao?texto=${encodeURIComponent(recomendacao)}`,
        {
          method: "PATCH",
        },
      );
      if (res.ok) {
        onRecarregar();
      } else {
        alert("Erro ao enviar recomendação.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEnviando(false);
    }
  };

  const enderecoFormatado = consulta.nmLogradouro
    ? `${consulta.nmLogradouro}, ${consulta.nrLogradouro} - ${consulta.nmBairro}`
    : "Endereço não informado";

  return (
    <>
      <ConfirmModal 
        isOpen={modalConfirmRec} 
        config={{title: "Enviar Recomendação", message: `Deseja enviar a recomendação "${recomendacao}" para o paciente ${pacienteNome}?`}} 
        onCancel={() => setModalConfirmRec(false)} 
        onConfirm={enviarRecomendacao} 
      />
      
      <div className="flex flex-col p-5 rounded-2xl border border-slate-100 hover:border-blue-200 bg-white shadow-sm transition-all group gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <User size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg leading-tight">
                {pacienteNome}
              </h4>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-red-400" /> {enderecoFormatado}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shrink-0">
            <p className="text-sm font-black text-blue-600">{data}</p>
            <p className="text-xs text-slate-500 font-bold flex items-center justify-end gap-1">
              <Clock size={12} /> {hora}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex gap-2 items-center">
          <button
            onClick={() => onAbrirChat(consulta.idDentista, consulta.idBeneficiario)}
            className="bg-blue-50 text-blue-600 p-2.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            title="Abrir Chat"
          >
            <MessageCircle size={16} />
          </button>
          <input
            type="text"
            value={recomendacao}
            onChange={(e) => setRecomendacao(e.target.value)}
            placeholder="Escreva uma recomendação (ex: Escovar os dentes)"
            className="flex-1 bg-slate-50 text-xs p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-400"
          />
          <button
            onClick={() => setModalConfirmRec(true)}
            disabled={!recomendacao || enviando}
            className="bg-blue-100 text-blue-700 p-2.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
            title="Salvar Recomendação"
          >
            <MessageSquarePlus size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

const DashboardDentista = () => {
  const idDentistaLogado = Number(localStorage.getItem("userId")) || 1;

  const [chatAberto, setChatAberto] = useState({
    isOpen: false,
    idDentista: 0,
    idBeneficiario: 0,
  });

  const [secaoAtiva, setSecaoAtiva] = useState("dashboard");
  const [estaAtivo, setEstaAtivo] = useState(true);
  const [loading, setLoading] = useState(true);

  const [dadosDentistaLogado, setDadosDentistaLogado] = useState<any>(null);

  const [consultasPendentes, setConsultasPendentes] = useState<any[]>([]);
  const [agenda, setAgenda] = useState<any[]>([]);
  const [beneficiarios, setBeneficiarios] = useState<any[]>([]);

  const [termoBusca, setTermoBusca] = useState("");

  const [consultasAtendidas, setConsultasAtendidas] = useState(0);
  const [enderecosConsultorios, setEnderecosConsultorios] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any>(null);
  const [prontuarioSucesso, setProntuarioSucesso] = useState(false);

  const [modalConfirmStatus, setModalConfirmStatus] = useState(false);

  const [materialEnviado, setMaterialEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formNovaConsulta = useForm();

  const fetchSeguro = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      return null;
    }
  };

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [
        dadosProximas,
        dadosPendentes,
        dadosBeneficiarios,
        dadosMedicos,
        todasConsultas,
        todosEnderecos,
      ] = await Promise.all([
        fetchSeguro(
          `${API_BASE_URL}/consultas/dentista/${idDentistaLogado}/proximas`,
        ),
        fetchSeguro(
          `${API_BASE_URL}/consultas/dentista/${idDentistaLogado}/pendentes`,
        ),
        fetchSeguro(`${API_BASE_URL}/beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/dentistas/${idDentistaLogado}`),
        fetchSeguro(`${API_BASE_URL}/consultas`),
        fetchSeguro(`${API_BASE_URL}/enderecos`),
      ]);

      setAgenda(dadosProximas || []);
      setConsultasPendentes(dadosPendentes || []);
      setBeneficiarios(dadosBeneficiarios || []);

      if (dadosMedicos) {
        setDadosDentistaLogado(dadosMedicos);
        setEstaAtivo(dadosMedicos.stDentista === "A");
      }

      if (Array.isArray(todasConsultas)) {
        const atendidas = todasConsultas.filter(
          (c) => c.idDentista === idDentistaLogado && c.dsProntuario !== null,
        );
        setConsultasAtendidas(atendidas.length);
      }

      if (Array.isArray(todosEnderecos)) {
        setEnderecosConsultorios(
          todosEnderecos.filter((e) => e.nmLocal === "C"),
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleToggleStatus = async () => {
    const novoStatus = estaAtivo ? "I" : "A";
    try {
      const res = await fetch(
        `${API_BASE_URL}/dentistas/${idDentistaLogado}/status?status=${novoStatus}`,
        {
          method: "PATCH",
        },
      );
      if (res.ok) {
        setEstaAtivo(!estaAtivo);
      } else {
        alert("Falha ao atualizar o status na base de dados.");
      }
    } catch (error) {}
  };

  const getNomeBeneficiario = (idBeneficiario: number) => {
    const paciente = beneficiarios.find(
      (b) => b.idBeneficiario === idBeneficiario,
    );
    return paciente
      ? paciente.nmPreBeneficiario
      : `Paciente #${idBeneficiario}`;
  };

  const filtroBusca = (item: any) => {
    if (!termoBusca) return true;
    const termo = termoBusca.toLowerCase();
    const nome = getNomeBeneficiario(item.idBeneficiario).toLowerCase();
    return nome.includes(termo);
  };

  const agendaFiltrada = agenda.filter(filtroBusca);
  const consultasPendentesFiltradas = consultasPendentes.filter(filtroBusca);

  const formatarData = (d: any) => {
    if (!d) return "Data indefinida";
    if (Array.isArray(d))
      return `${String(d[2]).padStart(2, "0")}/${String(d[1]).padStart(2, "0")}/${d[0]}`;
    return d;
  };

  const formatarHora = (h: any) => {
    if (!h) return "";
    if (Array.isArray(h))
      return `${String(h[0]).padStart(2, "0")}:${String(h[1]).padStart(2, "0")}`;
    return h;
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Visão Geral" },
    { id: "agenda", icon: Calendar, label: "Minha Agenda" },
    { id: "nova-consulta", icon: CalendarPlus, label: "Agendar Consulta" },
    { id: "prontuarios", icon: ClipboardList, label: "Prontuários Pendentes" },
    { id: "materiais", icon: Package, label: "Solicitar Materials" },
  ];

  const abrirModalProntuario = (consulta: any) => {
    setConsultaSelecionada(consulta);
    reset();
    setIsModalOpen(true);
  };

  const onSubmitProntuario = async (data: any) => {
    try {
      const idConsulta = consultaSelecionada.idConsulta;
      const textoEncoded = encodeURIComponent(data.ds_prontuario);

      const res = await fetch(
        `${API_BASE_URL}/consultas/${idConsulta}/prontuario?texto=${textoEncoded}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.ok) {
        setProntuarioSucesso(true);
        carregarDados();
        setTimeout(() => {
          setIsModalOpen(false);
          setProntuarioSucesso(false);
        }, 2500);
      } else {
        alert("Erro ao salvar prontuário.");
      }
    } catch (error) {}
  };

  const onSubmitNovaConsulta = async (data: any) => {
    try {
      const payload = {
        dtConsulta: data.dataConsulta,
        hrConsulta: data.horaConsulta + ":00",
        idBeneficiario: Number(data.idBeneficiario),
        idDentista: idDentistaLogado,
        idEndereco: Number(data.idEndereco),
      };

      const res = await fetch(`${API_BASE_URL}/consultas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Consulta agendada com sucesso!");
        formNovaConsulta.reset();
        carregarDados();
        setSecaoAtiva("agenda");
      } else {
        alert("Erro ao agendar consulta. Verifique os dados.");
      }
    } catch (error) {}
  };

  const onSubmitMaterial = async (e: any) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.target);
    formData.append("_subject", "Nova Solicitação de Materiais na Plataforma");
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    try {
      await fetch("https://formsubmit.co/ajax/pedrobegali27@gmail.com", {
        method: "POST",
        body: formData,
      });
      setMaterialEnviado(true);
      e.target.reset();
      setTimeout(() => setMaterialEnviado(false), 4000);
    } catch (error) {
    } finally {
      setEnviando(false);
    }
  };

  const handleSair = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold">
            Carregando dados do Dentista...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <ConfirmModal
        isOpen={modalConfirmStatus}
        config={{
          title: "Alterar Status",
          message: `Tem certeza que deseja alterar seu status para ${estaAtivo ? "Ausente" : "Recebendo Pacientes"}?`,
        }}
        onCancel={() => setModalConfirmStatus(false)}
        onConfirm={handleToggleStatus}
      />

      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-600 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            Dentista
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

        <div className="px-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              <Stethoscope size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900 truncate max-w-40">
                {dadosDentistaLogado
                  ? dadosDentistaLogado.nmDentista
                  : "Carregando..."}
              </p>
              <p className="text-xs text-slate-500">
                CRO:{" "}
                {dadosDentistaLogado
                  ? dadosDentistaLogado.croDentista
                  : "00000"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-100 mt-auto">
          <button
            onClick={handleSair}
            className="flex items-center gap-3 px-4 w-full text-slate-500 hover:text-red-500 transition-colors font-bold text-sm"
          >
            <LogOut size={18} />
            Sair da Conta
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center px-8 justify-between shrink-0 gap-4">
          <div className="items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 w-full max-w-md focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all hidden md:flex">
            <Search className="text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar paciente na agenda..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400 text-slate-700"
            />
          </div>

          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 ml-auto">
            <span
              className={`text-xs font-black uppercase tracking-widest ${estaAtivo ? "text-green-600" : "text-slate-400"}`}
            >
              {estaAtivo ? "Recebendo Pacientes" : "Ausente"}
            </span>
            <button
              onClick={() => setModalConfirmStatus(true)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${estaAtivo ? "bg-green-500" : "bg-slate-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${estaAtivo ? "translate-x-6" : "translate-x-0"}`}
              ></div>
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50">
          {secaoAtiva === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Olá, Dr(a).{" "}
                  {dadosDentistaLogado
                    ? dadosDentistaLogado.nmDentista.split(" ")[0]
                    : ""}
                  !
                </h2>
                <p className="text-slate-500 mt-1">
                  Aqui está o resumo dos seus atendimentos pela ONG.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EstatisticaCard
                  titulo="Próximas Consultas"
                  valor={agenda.length}
                  icone={Calendar}
                  cor="bg-blue-100 text-blue-600"
                />
                <EstatisticaCard
                  titulo="Prontuários Pendentes"
                  valor={consultasPendentes.length}
                  icone={ClipboardList}
                  cor="bg-orange-100 text-orange-600"
                />
                <EstatisticaCard
                  titulo="Pacientes Atendidos"
                  valor={consultasAtendidas}
                  icone={User}
                  cor="bg-green-100 text-green-600"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-4">
                    Próximos Pacientes
                  </h3>
                  <div className="space-y-3">
                    {agendaFiltrada.slice(0, 4).map((item) => (
                      <CardAgenda
                      key={item.idConsulta}
                      consulta={item}
                      pacienteNome={getNomeBeneficiario(item.idBeneficiario)}
                      data={formatarData(item.dtConsulta)}
                      hora={formatarHora(item.hrConsulta)}
                      onRecarregar={carregarDados}
                      onAbrirChat={(idDentista: number, idBeneficiario: number) => setChatAberto({ isOpen: true, idDentista, idBeneficiario })}
                    />
                    ))}
                    {agendaFiltrada.length === 0 && (
                      <p className="text-sm text-slate-500">
                        Agenda livre ou busca não encontrada.
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-4 flex items-center justify-between">
                    Atenção Necessária
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md">
                      {consultasPendentesFiltradas.length}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {consultasPendentesFiltradas.map((pend) => (
                      <div
                        key={pend.idConsulta}
                        className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">
                            Falta Prontuário
                          </p>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {getNomeBeneficiario(pend.idBeneficiario)}
                          </h4>
                          <p className="text-xs text-orange-400 mt-1">
                            Data: {formatarData(pend.dtConsulta)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSecaoAtiva("prontuarios");
                            abrirModalProntuario(pend);
                          }}
                          className="text-xs bg-white border border-orange-200 text-orange-600 font-bold px-3 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                        >
                          Resolver
                        </button>
                      </div>
                    ))}
                    {consultasPendentesFiltradas.length === 0 && (
                      <p className="text-sm text-slate-500">
                        Nenhuma pendência.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {secaoAtiva === "agenda" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Minha Agenda
              </h2>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                {agendaFiltrada.map((item) => (
                  <CardAgenda
                      key={item.idConsulta}
                      consulta={item}
                      pacienteNome={getNomeBeneficiario(item.idBeneficiario)}
                      data={formatarData(item.dtConsulta)}
                      hora={formatarHora(item.hrConsulta)}
                      onRecarregar={carregarDados}
                      onAbrirChat={(idDentista: number, idBeneficiario: number) => setChatAberto({ isOpen: true, idDentista, idBeneficiario })}
                    />
                ))}
                {agendaFiltrada.length === 0 && (
                  <p className="text-slate-500">
                    Você não possui consultas futuras agendadas.
                  </p>
                )}
              </div>
            </div>
          )}

          {secaoAtiva === "nova-consulta" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <CalendarPlus className="text-blue-600" size={28} /> Agendar
                    Nova Consulta
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Vincule um paciente da ONG à sua agenda marcando data e
                    endereço.
                  </p>
                </div>

                <form
                  onSubmit={formNovaConsulta.handleSubmit(onSubmitNovaConsulta)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Beneficiário (Paciente)
                    </label>
                    <select
                      {...formNovaConsulta.register("idBeneficiario", {
                        required: true,
                      })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione um paciente...</option>
                      {beneficiarios.map((b) => (
                        <option key={b.idBeneficiario} value={b.idBeneficiario}>
                          {b.nmPreBeneficiario} (CPF: {b.cpfPreBeneficiario})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                        Data da Consulta
                      </label>
                      <input
                        type="date"
                        {...formNovaConsulta.register("dataConsulta", {
                          required: true,
                        })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                        Hora
                      </label>
                      <input
                        type="time"
                        {...formNovaConsulta.register("horaConsulta", {
                          required: true,
                        })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Consultório de Atendimento
                    </label>
                    <select
                      {...formNovaConsulta.register("idEndereco", {
                        required: true,
                      })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione o local da consulta...</option>
                      {enderecosConsultorios.map((end) => (
                        <option key={end.idEndereco} value={end.idEndereco}>
                          {end.nmLogradouro}, {end.nrLogradouro} -{" "}
                          {end.nmBairro}
                        </option>
                      ))}
                    </select>
                    {enderecosConsultorios.length === 0 && (
                      <p className="text-xs text-red-500 mt-1">
                        Atenção: Não há endereços de Consultórios na base.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4"
                  >
                    CONFIRMAR AGENDAMENTO
                  </button>
                </form>
              </div>
            </div>
          )}

          {secaoAtiva === "prontuarios" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Prontuários Pendentes
              </h2>
              <p className="text-slate-500">
                Adicione as informações clínicas das consultas já realizadas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultasPendentesFiltradas.map((pendencia) => (
                  <div
                    key={pendencia.idConsulta}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-orange-600 mb-2">
                        <ClipboardList size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">
                          Aguardando Preenchimento
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xl">
                        {getNomeBeneficiario(pendencia.idBeneficiario)}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Data da Consulta: {formatarData(pendencia.dtConsulta)}
                      </p>
                    </div>
                    <button
                      onClick={() => abrirModalProntuario(pendencia)}
                      className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-md text-sm"
                    >
                      PREENCHER PRONTUÁRIO
                    </button>
                  </div>
                ))}
                {consultasPendentesFiltradas.length === 0 && (
                  <div className="col-span-2 bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
                    <CheckCircle2
                      size={32}
                      className="mx-auto text-green-500 mb-2"
                    />
                    <p className="font-bold text-green-700">
                      Tudo certo! Você não possui prontuários atrasados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {secaoAtiva === "materiais" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl space-y-6">
              <div className="bg-blue-600 p-8 md:p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Package size={28} />
                    </div>
                    <h2 className="text-3xl font-black">Solicitar Materiais</h2>
                  </div>
                  <p className="text-blue-100 text-sm mb-8 max-w-lg leading-relaxed">
                    Informe o local de entrega e descreva os insumos
                    odontológicos necessários. O pedido será enviado diretamente
                    para a central.
                  </p>

                  {!materialEnviado ? (
                    <form onSubmit={onSubmitMaterial} className="space-y-5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-blue-200 uppercase tracking-wider ml-1">
                          Local para Entrega
                        </label>
                        <input
                          type="text"
                          name="Local de Entrega"
                          required
                          placeholder="Ex: Unidade Norte, Clínica Paulista..."
                          className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-300 backdrop-blur-md"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-blue-200 uppercase tracking-wider ml-1">
                          Descrição dos Materiais
                        </label>
                        <textarea
                          name="Materiais Solicitados"
                          required
                          rows={3}
                          placeholder="Ex: 2 caixas de luvas tamanho M..."
                          className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-300 backdrop-blur-md resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={enviando}
                        className="w-full bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                      >
                        {enviando ? (
                          "Enviando Pedido..."
                        ) : (
                          <>
                            <Send size={18} /> Enviar Pedido
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="bg-green-500/20 border border-green-400/30 p-6 rounded-2xl backdrop-blur-md flex items-center gap-4 animate-in fade-in">
                      <CheckCircle2 className="text-green-300" size={32} />
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          Pedido Enviado com Sucesso!
                        </h4>
                        <p className="text-green-100 text-sm">
                          A central receberá o seu e-mail em instantes.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          )}
        </div>

        {isModalOpen && consultaSelecionada && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Evolução Clínica
                  </h2>
                  <p className="text-sm text-slate-500">
                    Paciente:{" "}
                    <strong className="text-slate-900">
                      {getNomeBeneficiario(consultaSelecionada.idBeneficiario)}
                    </strong>
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-red-500 bg-white rounded-full shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {!prontuarioSucesso ? (
                <form
                  onSubmit={handleSubmit(onSubmitProntuario)}
                  className="p-6 md:p-8 space-y-6"
                >
                  <div>
                    <label className="block text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
                      Descrição do Prontuário
                    </label>
                    <textarea
                      {...register("ds_prontuario", {
                        required: true,
                        minLength: 10,
                      })}
                      rows={6}
                      placeholder="Descreva os procedimentos (Mínimo de 10 caracteres)..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 resize-none text-slate-700"
                    ></textarea>
                    {errors.ds_prontuario && (
                      <span className="text-red-500 text-xs mt-1 block">
                        O prontuário deve ter no mínimo 10 caracteres.
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200"
                    >
                      Salvar Prontuário
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Prontuário Salvo!
                  </h3>
                  <p className="text-slate-500">
                    O histórico clínico do paciente foi atualizado com sucesso
                    na base de dados.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {chatAberto.isOpen && (
          <ChatComponent
            idDentista={chatAberto.idDentista}
            idBeneficiario={chatAberto.idBeneficiario}
            tipoUsuario="D"
            onClose={() =>
              setChatAberto({ isOpen: false, idDentista: 0, idBeneficiario: 0 })
            }
          />
        )}
      </main>
    </div>
  );
};

export default DashboardDentista;
