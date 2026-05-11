import { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "lucide-react";

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

const CardAgenda = ({ paciente, data, hora, local }: any) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-2xl border border-slate-100 hover:border-blue-200 bg-white shadow-sm transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
        <User size={20} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg leading-tight">
          {paciente}
        </h4>
        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
          <MapPin size={12} /> {local}
        </p>
      </div>
    </div>
    <div className="mt-4 md:mt-0 text-left md:text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
      <p className="text-sm font-black text-blue-600">{data}</p>
      <p className="text-xs text-slate-500 font-bold flex items-center justify-end gap-1">
        <Clock size={12} /> {hora}
      </p>
    </div>
  </div>
);

const DashboardDentista = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("dashboard");
  const [estaAtivo, setEstaAtivo] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any>(null);
  const [prontuarioSucesso, setProntuarioSucesso] = useState(false);

  const [materialEnviado, setMaterialEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const consultasPendentes = [
    {
      id_consulta: 1,
      paciente: "Enzo Oliveira",
      dt_consulta: "28/03/2026",
      local: "Unidade Central",
    },
    {
      id_consulta: 2,
      paciente: "Maria Eduarda",
      dt_consulta: "30/03/2026",
      local: "Clínica Parceira Sul",
    },
  ];

  const agenda = [
    {
      id_consulta: 101,
      paciente: "João Silva",
      data: "02/04/2026",
      hora: "09:00",
      local: "Unidade Central",
    },
    {
      id_consulta: 102,
      paciente: "Ana Clara",
      data: "03/04/2026",
      hora: "14:30",
      local: "Clínica Parceira Norte",
    },
  ];

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Visão Geral" },
    { id: "agenda", icon: Calendar, label: "Minha Agenda" },
    { id: "prontuarios", icon: ClipboardList, label: "Prontuários Pendentes" },
    { id: "materiais", icon: Package, label: "Solicitar Materiais" },
  ];

  const abrirModalProntuario = (consulta: any) => {
    setConsultaSelecionada(consulta);
    reset();
    setIsModalOpen(true);
  };

  const onSubmitProntuario = (data: any) => {
    console.log("Prontuário Salvo na T_BC_CONSULTA:", {
      id_consulta: consultaSelecionada.id_consulta,
      ds_prontuario: data.ds_prontuario,
    });
    setProntuarioSucesso(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setProntuarioSucesso(false);
    }, 2500);
  };

  // Função Real de Envio de E-mail via FormSubmit (sem back-end)
  const onSubmitMaterial = async (e: any) => {
    e.preventDefault();
    setEnviando(true);

    const formData = new FormData(e.target);
    // Configurações ocultas do FormSubmit
    formData.append(
      "_subject",
      "Nova Solicitação de Materiais - Dr. Augusto Lopes",
    );
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
      console.error("Erro ao enviar email", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-600 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            Dentista
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
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

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              <Stethoscope size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Dr. Augusto L.</p>
              <p className="text-xs text-slate-500">CRO: 12345-SP</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center px-8 justify-between shrink-0 gap-4">
          <div className="items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 w-full max-w-md focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all hidden md:flex">
            <Search className="text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar paciente na agenda..."
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
              onClick={() => setEstaAtivo(!estaAtivo)}
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
                  Olá, Dr. Augusto!
                </h2>
                <p className="text-slate-500 mt-1">
                  Aqui está o resumo da sua clínica hoje.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EstatisticaCard
                  titulo="Consultas Hoje"
                  valor="8"
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
                  valor="142"
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
                    {agenda.map((item) => (
                      <CardAgenda key={item.id_consulta} {...item} />
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-4 flex items-center justify-between">
                    Atenção Necessária
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md">
                      {consultasPendentes.length}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {consultasPendentes.map((pend) => (
                      <div
                        key={pend.id_consulta}
                        className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">
                            Falta Prontuário
                          </p>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {pend.paciente}
                          </h4>
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
                {agenda.map((item) => (
                  <CardAgenda key={item.id_consulta} {...item} />
                ))}
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
                {consultasPendentes.map((pendencia) => (
                  <div
                    key={pendencia.id_consulta}
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
                        {pendencia.paciente}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Data da Consulta: {pendencia.dt_consulta}
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
                    Preencha os insumos odontológicos que estão em falta na sua
                    unidade. O pedido será enviado diretamente para a central de
                    suprimentos da ONG (pedrobegali27@gmail.com).
                  </p>

                  {!materialEnviado ? (
                    <form onSubmit={onSubmitMaterial} className="space-y-4">
                      <input
                        type="hidden"
                        name="Dentista"
                        value="Dr. Augusto Lopes"
                      />
                      <input
                        type="hidden"
                        name="Unidade"
                        value="Unidade Central BridgeCare"
                      />

                      <div className="bg-white/10 p-1 rounded-2xl flex flex-col md:flex-row gap-2 backdrop-blur-md border border-white/20">
                        <input
                          type="text"
                          name="Materiais Solicitados"
                          required
                          placeholder="Ex: 2 caixas de luvas M, 5 resinas Z350..."
                          className="flex-1 px-5 py-4 rounded-xl bg-transparent border-none text-white outline-none placeholder:text-blue-200"
                        />
                        <button
                          type="submit"
                          disabled={enviando}
                          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-black transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          {enviando ? (
                            "Enviando..."
                          ) : (
                            <>
                              <Send size={18} /> Enviar Pedido
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-green-500/20 border border-green-400/30 p-6 rounded-2xl backdrop-blur-md flex items-center gap-4 animate-in fade-in">
                      <CheckCircle2 className="text-green-300" size={32} />
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          Pedido Enviado com Sucesso!
                        </h4>
                        <p className="text-green-100 text-sm">
                          A central de suprimentos receberá seu e-mail em
                          instantes.
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
                      {consultaSelecionada.paciente}
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
                      Descrição do Prontuário (ds_prontuario)
                    </label>
                    <textarea
                      {...register("ds_prontuario", { required: true })}
                      rows={6}
                      placeholder="Descreva os procedimentos realizados, evolução do paciente e observações clínicas..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 resize-none text-slate-700"
                    ></textarea>
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
                    O histórico clínico do paciente foi atualizado no banco de
                    dados.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardDentista;
