import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

const API_BASE_URL = "https://api-backend-bridgecare.onrender.com";

const CardConsultaAtiva = ({ consulta, dentistaNome, enderecoCompleto, dataFormatada, horaFormatada }: any) => (
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
              {dataFormatada}
            </p>
            <p className="text-slate-700 font-bold mt-1">às {horaFormatada}</p>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Dentista Responsável
            </h4>
            <p className="font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope size={16} className="text-blue-500" />{" "}
              {dentistaNome}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Local do Atendimento
            </h4>
            <p className="text-slate-600 font-medium text-sm flex items-center gap-2">
              <MapPin size={16} className="text-red-500 shrink-0" /> {enderecoCompleto}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 flex flex-col justify-center">
        <div>
          <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <AlertCircle size={16} className="text-blue-500" /> Motivo da Consulta
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Avaliação Odontológica / Tratamento Clínico.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <h4 className="font-bold text-orange-600 mb-1">
            Recomendações do Dentista:
          </h4>
          {consulta.dsRecomendacao ? (
            <p className="text-sm text-slate-600 italic">
              "{consulta.dsRecomendacao}"
            </p>
          ) : (
             <p className="text-sm text-slate-400 italic">
             Nenhuma recomendação prévia informada pelo médico.
           </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CardHistorico = ({ item, dentistaNome, enderecoCompleto, dataFormatada }: any) => {
  const dia = dataFormatada.split("/")[0];
  const mes = dataFormatada.split("/")[1];
  const ano = dataFormatada.split("/")[2];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-6 hover:border-blue-200 transition-all group">
      <div className="flex gap-6 items-center">
        <div className="text-center bg-slate-50 p-3 rounded-xl border border-slate-100 min-w-20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Realizada</p>
          <p className="font-black text-slate-900 text-lg">{dia}/{mes}</p>
          <p className="text-[10px] font-bold text-slate-400">{ano}</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            {dentistaNome}
          </h4>
          <p className="text-xs text-slate-500 font-medium mb-3"><MapPin size={12} className="inline mr-1"/>{enderecoCompleto}</p>
          <div className="p-3 bg-blue-50/50 rounded-lg text-xs text-slate-600 leading-relaxed border-l-2 border-blue-400 flex items-start gap-2 max-w-xl">
            <ClipboardCheck size={14} className="mt-0.5 text-blue-500 shrink-0" />
            <span>
              <strong>Prontuário:</strong> {item.dsProntuario || "O dentista ainda não preencheu o prontuário desta consulta."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardBeneficiario = () => {
  const navigate = useNavigate();
  const idBeneficiarioLogado = Number(localStorage.getItem("userId")) || 1;

  const [secaoAtiva, setSecaoAtiva] = useState("agenda");
  const [atualizacaoSucesso, setAtualizacaoSucesso] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [proximasConsultas, setProximasConsultas] = useState<any[]>([]);
  const [historicoConsultas, setHistoricoConsultas] = useState<any[]>([]);
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [enderecos, setEnderecos] = useState<any[]>([]);
  
  
  const [dadosPessoais, setDadosPessoais] = useState<any>({});

  const { register, handleSubmit, setValue } = useForm();

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
        proximas, 
        historico, 
        listaDentistas, 
        listaEnderecos,
        listaBeneficiarios,
        listaPreBeneficiarios,
        listaSolicitantes
      ] = await Promise.all([
        fetchSeguro(`${API_BASE_URL}/consultas/beneficiario/${idBeneficiarioLogado}/proximas`),
        fetchSeguro(`${API_BASE_URL}/consultas/beneficiario/${idBeneficiarioLogado}/historico`),
        fetchSeguro(`${API_BASE_URL}/dentistas`),
        fetchSeguro(`${API_BASE_URL}/enderecos`),
        fetchSeguro(`${API_BASE_URL}/beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/pre-beneficiarios`),
        fetchSeguro(`${API_BASE_URL}/solicitantes`)
      ]);

      setProximasConsultas(proximas || []);
      setHistoricoConsultas(historico || []);
      setDentistas(listaDentistas || []);
      setEnderecos(listaEnderecos || []);

      if (listaBeneficiarios && listaPreBeneficiarios) {
        const meuBeneficiario = listaBeneficiarios.find((b: any) => b.idBeneficiario === idBeneficiarioLogado);
        
        if (meuBeneficiario) {
          const meuPreBenef = listaPreBeneficiarios.find((pb: any) => pb.idPreBeneficiario === meuBeneficiario.idPreBeneficiario);
          
          if (meuPreBenef) {
            const meuSolicitante = listaSolicitantes?.find((s: any) => s.idSolicitante === meuPreBenef.idSolicitante);
            const meuEndereco = listaEnderecos?.find((e: any) => e.idEndereco === meuPreBenef.idEndereco);

            setDadosPessoais({
              idEndereco: meuPreBenef.idEndereco,
              idSolicitante: meuPreBenef.idSolicitante,
              nome: meuPreBenef.nmPreBeneficiario || "",
            });

            setValue("nome", meuPreBenef.nmPreBeneficiario);
            setValue("email", meuSolicitante ? meuSolicitante.email : "");
            setValue("telefone", meuSolicitante ? meuSolicitante.nrTelefone : "");
            
            if (meuEndereco) {
              setValue("cep", meuEndereco.nrCep);
              setValue("rua", meuEndereco.nmLogradouro);
              setValue("numero", meuEndereco.nrLogradouro);
              setValue("bairro", meuEndereco.nmBairro);
              setValue("cidade", meuEndereco.nmCidade);
            }
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const formatarData = (d: any) => {
    if (!d) return "Data indefinida";
    if (Array.isArray(d)) return `${String(d[2]).padStart(2, '0')}/${String(d[1]).padStart(2, '0')}/${d[0]}`;
    return d;
  };

  const formatarHora = (h: any) => {
    if (!h) return "";
    if (Array.isArray(h)) return `${String(h[0]).padStart(2, '0')}:${String(h[1]).padStart(2, '0')}`;
    return h;
  };

  const getNomeDentista = (id: number) => {
    const d = dentistas.find((den) => den.idDentista === id);
    return d ? d.nmDentista : `Dr(a). Indefinido`;
  };

  const getEnderecoCompleto = (id: number) => {
    const e = enderecos.find((end) => end.idEndereco === id);
    return e ? `${e.nmLogradouro}, ${e.nrLogradouro} - ${e.nmBairro}, ${e.nmCidade}` : "Endereço não encontrado";
  };

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

  const onSubmitPerfil = async (data: any) => {
    setSalvando(true);

    try {
      const reqSolicitante = fetch(`${API_BASE_URL}/solicitantes/${dadosPessoais.idSolicitante}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idSolicitante: dadosPessoais.idSolicitante,
          nrTelefone: data.telefone,
          email: data.email
        })
      });

      const reqEndereco = fetch(`${API_BASE_URL}/enderecos/${dadosPessoais.idEndereco}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idEndereco: dadosPessoais.idEndereco,
          nmLocal: "P", 
          nmLogradouro: data.rua,
          nrLogradouro: Number(data.numero),
          nmBairro: data.bairro,
          nmCidade: data.cidade,
          nrCep: data.cep.replace(/\D/g, "")
        })
      });

      const [resSol, resEnd] = await Promise.all([reqSolicitante, reqEndereco]);

      if (resSol.ok && resEnd.ok) {
        setAtualizacaoSucesso(true);
        setTimeout(() => setAtualizacaoSucesso(false), 3000);
      } else {
        alert("Ocorreu um erro ao atualizar os seus dados.");
      }

    } catch (error) {
      console.error("Erro na requisição PUT:", error);
    } finally {
      setSalvando(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const menuItems = [
    { id: "agenda", icon: Calendar, label: "Próximas Consultas" },
    { id: "historico", icon: History, label: "Histórico Clínico" },
    { id: "perfil", icon: User, label: "Meus Dados" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold">Carregando seu histórico de saúde...</p>
        </div>
      </div>
    );
  }

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
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 w-full text-slate-500 hover:text-red-500 transition-colors font-bold text-sm">
            <LogOut size={18} /> Sair da Conta
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="font-black text-slate-900 text-lg flex items-center gap-2">
            <UserCircle2 className="text-blue-600" />
            Olá, {dadosPessoais.nome ? dadosPessoais.nome.split(" ")[0] : "Paciente"}!
          </h2>
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
                  <CardConsultaAtiva 
                    key={consulta.idConsulta} 
                    consulta={consulta} 
                    dentistaNome={getNomeDentista(consulta.idDentista)}
                    enderecoCompleto={getEnderecoCompleto(consulta.idEndereco)}
                    dataFormatada={formatarData(consulta.dtConsulta)}
                    horaFormatada={formatarHora(consulta.hrConsulta)}
                  />
                ))
              ) : (
                <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center">
                  <Calendar size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">
                    Nenhuma consulta agendada
                  </h3>
                  <p className="text-slate-500 mt-2">
                    Atualizaremos assim que a central agendar seu próximo atendimento.
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
                {historicoConsultas.length > 0 ? (
                  historicoConsultas.map((item) => (
                    <CardHistorico 
                      key={item.idConsulta} 
                      item={item} 
                      dentistaNome={getNomeDentista(item.idDentista)}
                      enderecoCompleto={getEnderecoCompleto(item.idEndereco)}
                      dataFormatada={formatarData(item.dtConsulta)}
                    />
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                    Nenhuma consulta registrada em seu histórico.
                  </div>
                )}
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
                    Mantenha suas informações atualizadas para não perder nossos contatos.
                  </p>
                </div>

                {!atualizacaoSucesso ? (
                  <form onSubmit={handleSubmit(onSubmitPerfil)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                          Nome Completo (Apenas Leitura)
                        </label>
                        <input
                          {...register("nome")}
                          disabled
                          className="w-full p-4 bg-slate-100 text-slate-500 border border-slate-200 rounded-2xl outline-none"
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
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">CEP</label>
                          <input
                            {...register("cep", { required: true })}
                            onBlur={buscarCEP}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Logradouro / Rua</label>
                          <input
                            {...register("rua", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Número</label>
                          <input
                            id="numeroBeneficiario"
                            {...register("numero", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Bairro</label>
                          <input
                            {...register("bairro", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Cidade</label>
                          <input
                            {...register("cidade", { required: true })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={salvando}
                      className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4 disabled:opacity-70"
                    >
                      {salvando ? "A GUARDAR DADOS..." : "SALVAR ALTERAÇÕES"}
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
                      As suas informações foram salvas com sucesso na base de dados.
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