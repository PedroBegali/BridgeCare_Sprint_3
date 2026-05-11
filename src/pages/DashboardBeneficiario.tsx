import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  UserCircle2,
  MapPin,
  ClipboardCheck,
  History,
  User,
  Stethoscope,
  LogOut,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const CardConsultaAtiva = ({ consulta }: any) => (
  <div className="bg-white rounded-3xl shadow-sm border border-blue-100 overflow-hidden relative group">
    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
            <Calendar size={32} />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-sm uppercase mb-1">
              Data Agendada
            </p>
            <p className="text-blue-600 font-black text-2xl leading-none">
              {consulta.data}
            </p>
            <p className="text-slate-700 font-bold mt-1">às {consulta.hora}</p>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Dentista Responsável
            </h4>
            <p className="font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope size={16} className="text-blue-500" />{" "}
              {consulta.dentista}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Local do Atendimento
            </h4>
            <p className="text-slate-600 font-medium text-sm flex items-center gap-2">
              <MapPin size={16} className="text-red-500" /> {consulta.local}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 flex flex-col justify-center">
        <div>
          <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <AlertCircle size={16} className="text-blue-500" /> Motivo da
            Consulta
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {consulta.descricao}
          </p>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <h4 className="font-bold text-orange-600 mb-1">
            Recomendações Prévias:
          </h4>
          <p className="text-sm text-slate-600 italic">
            "{consulta.recomendacoes}"
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CardHistorico = ({ item }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-6 hover:border-blue-200 transition-all group">
    <div className="flex gap-6 items-center">
      <div className="text-center bg-slate-50 p-3 rounded-xl border border-slate-100 min-w-20">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">
          Realizada
        </p>
        <p className="font-black text-slate-900 text-lg">
          {item.data.split("/")[0]}/{item.data.split("/")[1]}
        </p>
        <p className="text-[10px] font-bold text-slate-400">
          {item.data.split("/")[2]}
        </p>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          {item.dentista}
        </h4>
        <p className="text-xs text-slate-500 font-medium mb-3">{item.local}</p>
        <div className="p-3 bg-blue-50/50 rounded-lg text-xs text-slate-600 leading-relaxed border-l-2 border-blue-400 flex items-start gap-2 max-w-xl">
          <ClipboardCheck size={14} className="mt-0.5 text-blue-500 shrink-0" />
          <span>
            <strong>Prontuário:</strong> {item.prontuario}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const DashboardBeneficiario = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("agenda");
  const [atualizacaoSucesso, setAtualizacaoSucesso] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const beneficiarioData = {
    nome: "Fátima Oliveira",
    cpf: "123.456.789-00",
    email: "fatima.oliveira@email.com",
    telefone: "(11) 98888-7777",
    cep: "01310-100",
    rua: "Av. Paulista",
    numero: "1000",
    bairro: "Bela Vista",
    cidade: "São Paulo",
  };

  useEffect(() => {
    Object.keys(beneficiarioData).forEach((key) => {
      setValue(key, beneficiarioData[key as keyof typeof beneficiarioData]);
    });
  }, [setValue]);

  const proximasConsultas = [
    {
      id: 1,
      data: "15/04/2026",
      hora: "10:00",
      dentista: "Dra. Ana Beatriz",
      local: "Unidade Central - Av. Paulista, 1000",
      descricao: "Limpeza profilática e avaliação de cáries.",
      recomendacoes:
        "Trazer escova de dentes e chegar com 15 minutos de antecedência.",
    },
  ];

  const historicoConsultas = [
    {
      id: 101,
      data: "10/01/2026",
      dentista: "Dr. Ricardo Santos",
      local: "Clínica Parceira Sul",
      prontuario:
        "Paciente apresentou boa higiene. Realizada restauração no dente 24 (Resina Composta).",
    },
    {
      id: 102,
      data: "20/02/2025",
      dentista: "Dra. Maria Silva",
      local: "Unidade Norte - Rua das Palmeiras, 500",
      prontuario:
        "Paciente relatou dor aguda. Realizado exame radiológico e prescrição de analgésicos.",
    },
  ];

  const menuItems = [
    { id: "agenda", icon: Calendar, label: "Próximas Consultas" },
    { id: "historico", icon: History, label: "Histórico Clínico" },
    { id: "perfil", icon: User, label: "Meus Dados" },
  ];

  const buscarCEP = async (e: any) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue("rua", data.logradouro);
          setValue("bairro", data.bairro);
          setValue("cidade", data.localidade);
          document.getElementById("numeroBeneficiario")?.focus();
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const onSubmitPerfil = (data: any) => {
    console.log("Dados atualizados na T_BC_SOLICITANTE e T_BC_ENDERECO:", data);
    setAtualizacaoSucesso(true);
    setTimeout(() => setAtualizacaoSucesso(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-600 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            Beneficiário
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
          <button className="flex items-center gap-3 w-full text-slate-500 hover:text-red-500 transition-colors font-bold text-sm">
            <LogOut size={18} /> Sair da Conta
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="font-black text-slate-900 text-lg flex items-center gap-2">
            <UserCircle2 className="text-blue-600" />
            Olá, {beneficiarioData.nome.split(" ")[0]}!
          </h2>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
            Beneficiário Ativo
          </span>
        </header>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50">
          {secaoAtiva === "agenda" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Seu Próximo Atendimento
                </h2>
                <p className="text-slate-500 mt-1">
                  Confira os detalhes e recomendações para sua consulta.
                </p>
              </div>

              {proximasConsultas.length > 0 ? (
                proximasConsultas.map((consulta) => (
                  <CardConsultaAtiva key={consulta.id} consulta={consulta} />
                ))
              ) : (
                <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center">
                  <Calendar size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">
                    Nenhuma consulta agendada
                  </h3>
                  <p className="text-slate-500 mt-2">
                    Você será notificado assim que a central agendar seu próximo
                    atendimento.
                  </p>
                </div>
              )}
            </div>
          )}

          {secaoAtiva === "historico" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Seu Histórico Clínico
                </h2>
                <p className="text-slate-500 mt-1">
                  Acompanhe todos os procedimentos já realizados.
                </p>
              </div>

              <div className="space-y-4">
                {historicoConsultas.map((item) => (
                  <CardHistorico key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {secaoAtiva === "perfil" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900">
                    Meus Dados Cadastrais
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Mantenha suas informações atualizadas para não perder nossos
                    contatos.
                  </p>
                </div>

                {!atualizacaoSucesso ? (
                  <form
                    onSubmit={handleSubmit(onSubmitPerfil)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Nome Completo
                        </label>
                        <input
                          {...register("nome", { required: true })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          E-mail
                        </label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Telefone / WhatsApp
                        </label>
                        <input
                          {...register("telefone", { required: true })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <h3 className="text-sm font-bold text-blue-600 uppercase mb-4">
                        Endereço Residencial
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            CEP
                          </label>
                          <input
                            {...register("cep", { required: true })}
                            onBlur={buscarCEP}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Logradouro / Rua
                          </label>
                          <input
                            {...register("rua", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Número
                          </label>
                          <input
                            id="numeroBeneficiario"
                            {...register("numero", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Bairro
                          </label>
                          <input
                            {...register("bairro", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                            Cidade
                          </label>
                          <input
                            {...register("cidade", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4"
                    >
                      SALVAR ALTERAÇÕES
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      Dados Atualizados!
                    </h3>
                    <p className="text-slate-500">
                      Suas informações foram salvas com sucesso em nossa base de
                      dados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardBeneficiario;
