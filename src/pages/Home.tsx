import { Link } from "react-router-dom";
import {
  Calendar,
  Activity,
  ShieldCheck,
  ArrowRight,
  Headset,
  X,
  CheckCircle2,
} from "lucide-react";
import criancaVoluntaria from "../assets/criancaVoluntaria.png";
import dentista_explicando from "../assets/dentista_explicando.jpg";
import dentista_avaliando_paciente from "../assets/dentista_avaliando_paciente.jpg";
import dentista_preparando_equipamento from "../assets/dentista_preparando_equipamento.jpg";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const API_BASE_URL = "https://api-backend-bridgecare.onrender.com";

type AtendimentoFormData = {
  nome: string;
  responsavel?: string;
  libras: string;
  telefone: string;
  email: string;
};

function Home() {
  const diferenciais = [
    {
      id: 1,
      titulo: "Agendamento Fácil",
      icon: <Calendar className="text-sky-600" size={32} />,
      desc: "Marque consultas em segundos pelo nosso portal.",
      link: "/contato",
    },
    {
      id: 2,
      titulo: "Rede Ampla",
      icon: <Activity className="text-sky-600" size={32} />,
      desc: "Conectamos você às melhores instituições de saúde.",
      link: "/login",
    },
    {
      id: 3,
      titulo: "Histórico Seguro",
      icon: <ShieldCheck className="text-sky-600" size={32} />,
      desc: "Seus dados protegidos e acessíveis em um só lugar.",
      link: "/login",
    },
  ];

  const imagensCarrossel = [
    dentista_explicando,
    dentista_avaliando_paciente,
    dentista_preparando_equipamento,
  ];

  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % imagensCarrossel.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AtendimentoFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");

  const onSubmit = async (data: AtendimentoFormData) => {
    setSalvando(true);

    try {
      const payload = {
        nmSolicitante: data.nome,
        nmResponsavel: data.responsavel || null,
        stLibras: data.libras === "Sim" ? "S" : "N",
        nrTelefone: data.telefone,
        email: data.email,
      };

      const response = await fetch(`${API_BASE_URL}/solicitantes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setNomeCliente(data.nome);
        setEnviado(true);

        setTimeout(() => {
          setIsModalOpen(false);
          setEnviado(false);
          setNomeCliente("");
          reset();
        }, 3000);
      } else {
        alert("Ocorreu um erro ao enviar sua solicitação. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Falha na conexão com o servidor.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="animate-in fade-in duration-700">
      <section className="relative bg-slate-900 pt-20 pb-45 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
              Conectando <span className="text-sky-400">Cuidado</span> <br />e
              Inovando
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Transformamos a experiência de saúde através de soluções
              inteligentes que unem pacientes e médicos de forma humana e
              eficiente.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/sobre"
                className="bg-sky-500 text-white px-10 py-4 rounded-full font-bold hover:bg-sky-400 hover:-translate-y-1 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
              >
                Saiba mais sobre o projeto
              </Link>
            </div>
          </div>

          <div className="flex-1 relative">
            <img
              className="rounded-[3rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500 border border-white/10"
              src={criancaVoluntaria}
              alt="Dentista e criança fazendo sinal de positivo"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden">
          <svg
            className="relative block w-full h-20 md:h-30"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,10.18,20,100,40C190,60,263,67,321.39,56.44Z"
              fill="#f8fafc"
            ></path>
          </svg>
        </div>
      </section>

      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full relative group">
              <div className="relative h-100 w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-slate-50">
                {imagensCarrossel.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Slide ${index}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === slideAtual ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {imagensCarrossel.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === slideAtual
                          ? "w-8 bg-sky-500"
                          : "w-2 bg-white/50"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-full font-bold text-sm uppercase tracking-wider">
                <Headset size={18} />
                Atendimento Humanizado
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Precisa de suporte especializado? <br />
                <span className="text-sky-500">
                  Estamos prontos para ajudar.
                </span>
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
                Nossa equipe de consultores está disponível para tirar suas
                dúvidas, ajudar com agendamentos e garantir que você tenha a
                melhor experiência em nossa plataforma.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-sky-600 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200 active:scale-95 group"
                >
                  Solicitar atendimento
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Tudo que você precisa em um só lugar
            </h2>
            <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Soluções completas e integradas para revolucionar a forma como
              cuidamos do que mais importa: o seu sorriso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {diferenciais.map((card) => (
              <div
                key={card.id}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-500 group-hover:scale-110 transition-all">
                  <div className="group-hover:text-white transition-colors">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                  {card.titulo}
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                  {card.desc}
                </p>
                <Link
                  to={card.link}
                  className="text-sky-600 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-widest"
                >
                  Quero saber mais <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            {!enviado ? (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Solicitar Atendimento
                  </h3>
                  <p className="text-slate-500">
                    Preencha os dados abaixo e nossa equipe entrará em contato
                    em breve.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Qual seu nome completo?
                    </label>
                    <input
                      {...register("nome", {
                        required: "O nome é obrigatório",
                      })}
                      className={`w-full px-5 py-4 bg-slate-50 border ${errors.nome ? "border-red-500" : "border-slate-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all`}
                      placeholder="Ex: João Silva"
                    />
                    {errors.nome && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.nome.message as string}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Nome do seu responsável (se houver)
                    </label>
                    <input
                      {...register("responsavel")}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="Nome do pai, mãe ou tutor"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                      Necessita de atendimento em Libras?
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          value="Sim"
                          {...register("libras")}
                          className="w-5 h-5 text-sky-500 focus:ring-sky-500"
                        />
                        <span className="text-slate-600 group-hover:text-sky-600 transition-colors">
                          Sim
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          value="Não"
                          {...register("libras")}
                          className="w-5 h-5 text-sky-500 focus:ring-sky-500"
                          defaultChecked
                        />
                        <span className="text-slate-600 group-hover:text-sky-600 transition-colors">
                          Não
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                        Telefone
                      </label>
                      <input
                        {...register("telefone", {
                          required: "Telefone obrigatório",
                        })}
                        className={`w-full px-5 py-4 bg-slate-50 border ${errors.telefone ? "border-red-500" : ("border-slate-200" as string)} rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all`}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                        Melhor E-mail
                      </label>
                      <input
                        {...register("email", {
                          required: "E-mail obrigatório",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "E-mail inválido",
                          },
                        })}
                        className={`w-full px-5 py-4 bg-slate-50 border ${errors.email ? "border-red-500" : ("border-slate-200" as string)} rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all`}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={salvando}
                    className="w-full bg-sky-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 active:scale-[0.98] mt-4 disabled:opacity-70"
                  >
                    {salvando ? "Enviando..." : "Enviar Solicitação"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12 space-y-6 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-900">
                  Solicitação Enviada!
                </h3>
                <p className="text-slate-500">
                  Obrigado,{" "}
                  <span className="font-bold text-slate-900">
                    {nomeCliente}
                  </span>
                  . Em breve nossa equipe entrará em contato pelo telefone
                  informado.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
