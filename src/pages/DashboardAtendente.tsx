import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  UserPlus,
  Users,
  CalendarClock,
  Search,
  EarOff,
  History,
  LayoutDashboard,
  HandCoins,
  MoreVertical,
  FileText,
  Download,
  Stethoscope,
  X,
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
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
            <th className="p-4 font-bold">Responsável</th>
            <th className="p-4 font-bold">Dentista Vinculado</th>
            <th className="p-4 font-bold text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {aprovados.map((b: any) => (
            <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="p-4 font-medium text-slate-900">{b.nome}</td>
              <td className="p-4 text-slate-500">{b.cpf}</td>
              <td className="p-4 text-slate-500">{b.responsavel}</td>
              <td className="p-4">
                <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit font-medium text-xs">
                  <Stethoscope size={14} /> {b.dentista}
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
        </tbody>
      </table>
    </div>
  </div>
);

const DashboardAtendente = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("dashboard");

  const novasSolicitacoes = [
    {
      id: 1,
      nome: "Beatriz Santos",
      dt_nascimento: "2010-05-14",
      libras: "S",
      telefone: "(11) 96666-5555",
      email: "beatriz.santos@email.com",
      situacao: "AN",
    },
    {
      id: 2,
      nome: "Rodrygo Gomes",
      dt_nascimento: "2007-02-10",
      libras: "N",
      telefone: "(11) 98888-7777",
      email: "rodrygo@email.com",
      situacao: "AN",
    },
  ];
  const aprovados = [
    {
      id: 101,
      nome: "Ana Julia",
      cpf: "123.456.789-00",
      responsavel: "Carla Souza",
      dentista: "Dr. Ricardo",
      situacao: "AP",
    },
    {
      id: 102,
      nome: "Lucas Mendes",
      cpf: "987.654.321-11",
      responsavel: "João Mendes",
      dentista: "Dra. Fernanda",
      situacao: "AP",
    },
  ];

  const doacoes = [
    {
      id: 1,
      doador: "Empresa XPTO",
      valor: "R$ 5.000,00",
      data: "12/05/2026",
      tipo: "Única",
    },
    {
      id: 2,
      doador: "Carlos Silva",
      valor: "R$ 150,00",
      data: "10/05/2026",
      tipo: "Mensal",
    },
  ];

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Visão Geral" },
    { id: "novos", icon: UserPlus, label: "Novos Solicitantes" },
    { id: "triagem", icon: CalendarClock, label: "Fila de Triagem" },
    { id: "beneficiarios", icon: Users, label: "Beneficiários Ativos" },
    { id: "doacoes", icon: HandCoins, label: "Gestão de Doações" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const proximasTriagens = [
    {
      id: "TR-101",
      data: "15/05/2026",
      hora: "08:00 as 12:00",
      local: "Posto Central",
      vagas: 5,
    },
    {
      id: "TR-102",
      data: "18/05/2026",
      hora: "13:00 as 17:00",
      local: "Posto Central",
      vagas: 2,
    },
    {
      id: "TR-103",
      data: "22/05/2026",
      hora: "08:00 as 12:00",
      local: "Posto Norte",
      vagas: 10,
    },
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

          document.getElementById("numeroEndereco")?.focus();
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const abrirModalCadastro = (solicitante: any) => {
    reset();
    setValue("nomeCompleto", solicitante.nome);
    setIsModalOpen(true);
  };

  const onSubmitCadastro = (data: any) => {
    console.log("Dados do Novo Pré-Beneficiário:", data);
    setCadastroSucesso(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setCadastroSucesso(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-600 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            Atendente
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

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
              AT
            </div>
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
            <input
              type="text"
              placeholder="Buscar por CPF ou Nome..."
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
                    Bom dia, Atendente!
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Aqui está o resumo das atividades de hoje.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <EstatisticaCard
                  titulo="Novas Solicitações"
                  valor="12"
                  icone={UserPlus}
                  cor="bg-blue-100 text-blue-600"
                />
                <EstatisticaCard
                  titulo="Aguardando Triagem"
                  valor="8"
                  icone={CalendarClock}
                  cor="bg-amber-100 text-amber-600"
                />
                <EstatisticaCard
                  titulo="Beneficiários Ativos"
                  valor="1.204"
                  icone={Users}
                  cor="bg-green-100 text-green-600"
                />
                <EstatisticaCard
                  titulo="Doações do Mês"
                  valor="R$ 12k"
                  icone={HandCoins}
                  cor="bg-purple-100 text-purple-600"
                />
              </div>

              <TabelaBeneficiarios aprovados={aprovados} />
            </div>
          )}

          {secaoAtiva === "beneficiarios" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Gestão de Beneficiários
              </h2>
              <TabelaBeneficiarios aprovados={aprovados} />
            </div>
          )}

          {secaoAtiva === "novos" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-slate-900">
                Solicitações em Análise
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {novasSolicitacoes.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                          <UserPlus size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg leading-tight">
                            {s.nome}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Nasc: {s.dt_nascimento}
                          </p>
                        </div>
                      </div>

                      {s.libras === "S" && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
                          <EarOff size={14} /> LIBRAS
                        </span>
                      )}
                    </div>

                    {s.libras === "S" ? (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          E-mail preferencial
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {s.email}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Telefone para Contato
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {s.telefone}
                        </span>
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
              </div>
            </div>
          )}

          {secaoAtiva === "doacoes" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">
                  Relatório de Doações
                </h2>
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800">
                  <FileText size={16} /> Gerar Relatório PDF
                </button>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-bold">Doador</th>
                      <th className="p-4 font-bold">Valor</th>
                      <th className="p-4 font-bold">Periodicidade</th>
                      <th className="p-4 font-bold">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {doacoes.map((d) => (
                      <tr key={d.id}>
                        <td className="p-4 font-medium text-slate-900">
                          {d.doador}
                        </td>
                        <td className="p-4 font-bold text-green-600">
                          {d.valor}
                        </td>
                        <td className="p-4 text-slate-500">{d.tipo}</td>
                        <td className="p-4 text-slate-500">{d.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Finalizar Cadastro - Pré-Beneficiário
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Preencha os dados e agende a triagem com o paciente na
                    linha.
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
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Nome Completo
                            </label>
                            <input
                              {...register("nomeCompleto", { required: true })}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Data de Nascimento
                            </label>
                            <input
                              type="date"
                              {...register("dataNascimento", {
                                required: true,
                              })}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              CPF
                            </label>
                            <input
                              placeholder="000.000.000-00"
                              {...register("cpf", { required: true })}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                              Sexo
                            </label>
                            <div className="flex gap-4 p-2">
                              <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                  type="radio"
                                  value="F"
                                  {...register("sexo")}
                                  className="w-4 h-4 text-blue-600"
                                />{" "}
                                Feminino
                              </label>
                              <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                  type="radio"
                                  value="M"
                                  {...register("sexo")}
                                  className="w-4 h-4 text-blue-600"
                                />{" "}
                                Masculino
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                          Endereço
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              CEP
                            </label>
                            <input
                              placeholder="00000-000"
                              {...register("cep", { required: true })}
                              onBlur={buscarCEP}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Rua / Logradouro
                            </label>
                            <input
                              {...register("rua")}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Número
                            </label>
                            <input
                              id="numeroEndereco"
                              {...register("numero", { required: true })}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Bairro
                            </label>
                            <input
                              {...register("bairro")}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Cidade
                            </label>
                            <input
                              {...register("cidade")}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                          Situação Odontológica
                        </h3>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Descrição do Problema Dentário
                          </label>
                          <textarea
                            placeholder="Descreva brevemente os sintomas informados..."
                            {...register("problemaDentario", {
                              required: true,
                            })}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none"
                          ></textarea>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <label className="block text-sm font-bold text-blue-900 mb-1">
                          ID da Triagem Agendada
                        </label>
                        <input
                          placeholder="Selecione uma triagem ao lado ou digite o ID"
                          {...register("idTriagem", { required: true })}
                          className="w-full p-3 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-bold text-blue-700"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6">
                      <CalendarDays className="text-blue-600" />
                      <h3 className="font-bold text-slate-900 text-lg">
                        Próximas Triagens
                      </h3>
                    </div>

                    <p className="text-sm text-slate-500 mb-6">
                      Informe estas datas ao paciente. <br />
                      <strong>Dica:</strong> Clique em um card para
                      auto-preencher o ID no formulário.
                    </p>

                    <div className="space-y-4">
                      {proximasTriagens.map((triagem) => (
                        <div
                          key={triagem.id}
                          onClick={() => setValue("idTriagem", triagem.id)}
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              ID: {triagem.id}
                            </span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                              {triagem.vagas} vagas
                            </span>
                          </div>
                          <p className="font-bold text-slate-900 text-lg mb-1">
                            {triagem.data}
                          </p>
                          <div className="space-y-1 text-sm text-slate-500">
                            <p className="flex items-center gap-2">
                              <Clock size={14} /> {triagem.hora}
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin size={14} /> {triagem.local}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Cadastro Finalizado!
                  </h3>
                  <p className="text-slate-500">
                    O solicitante foi convertido para{" "}
                    <strong>Pré-Beneficiário</strong> e sua triagem foi agendada
                    com sucesso.
                  </p>
                </div>
              )}

              {!cadastroSucesso && (
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    form="formCadastro"
                    type="submit"
                    className="px-8 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                  >
                    Salvar e Agendar Triagem
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
