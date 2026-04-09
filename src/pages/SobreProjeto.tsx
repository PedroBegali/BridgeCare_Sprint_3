import { Link } from "react-router-dom";
import { History, DollarSign, Target, Sparkles} from "lucide-react";
import pessoa_smartPhone from "../assets/pessoa_smartphone.png"
import planejamento from "../assets/planejamento.png"

function SobreProjeto() {
  const pilares = [
    {
      icon: <History size={40} />,
      titulo: "História",
      desc: "Nossa trajetória é pautada na transparência e no compromisso com a saúde pública.",
    },
    {
      icon: <DollarSign size={40} />,
      titulo: "Recursos",
      desc: "Gestão eficiente de doações para garantir que cada centavo chegue ao destino.",
    },
    {
      icon: <Target size={40} />,
      titulo: "Objetivo",
      desc: "Unir tecnologia e voluntariado para reduzir filas de espera odontológicas.",
    },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-600">
      <section className="relative bg-slate-900 pt-32 pb-48 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
  <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
    Sobre o <span className="text-sky-400">Projeto</span>
  </h1>
  <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
    Transformando a gestão de dados da Turma do Bem para ampliar o
    impacto social e devolver sorrisos.
  </p>
  <Link 
    to="/mini-jogos" 
    className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-sky-500/20 active:scale-95"
  >
    Conheça Nosso Diferencial!
  </Link>
</div>

        <div className="absolute bottom-0 w-full leading-none">
          <svg
            className="relative block w-full h-30"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,10.18,20,100,40C190,60,263,67,321.39,56.44Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative p-8 md:p-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>

            <div className="relative z-10 w-full aspect-square overflow-hidden rounded-[3rem] shadow-2xl border-12 border-white">
              <img
                src={pessoa_smartPhone}
                alt="Tecnologia BridgeCare"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-2 md:right-4 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-sky-500 p-3 rounded-2xl text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-slate-900 font-black text-3xl leading-none">
                  +100k
                </p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Vidas Impactadas
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest">
              Nossa Inovação
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              A Ponte entre o <span className="text-sky-500">Cuidado</span> e a
              Eficiência
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              "Buscamos resolver a descentralização das informações para
              potencializar a coleta de dados para a Turma do Bem."
            </p>
            <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-sky-500">
              <p className="text-slate-600 italic">
                Nossa solução centraliza atendimentos e simplifica o acesso,
                garantindo que o foco permaneça onde realmente importa: no
                paciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Nossos Pilares
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A base do nosso planejamento estratégico para transformar a saúde
              bucal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pilares.map((pilar, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100"
              >
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-6 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 transition-all">
                  {pilar.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                  {pilar.titulo}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl">
          <div className="flex-1 space-y-10 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Planejamento & <br />
              <span className="text-sky-400">Público</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <span className="flex-none w-12 h-12 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center font-bold border border-sky-500/30 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">
                    Beneficiários
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Simplificamos o preenchimento de dados e tornamos a jornada
                    atrativa com mini jogos interativos.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <span className="flex-none w-12 h-12 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center font-bold border border-sky-500/30 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">
                    Doadores
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Transparência total e planos de doação com benefícios em
                    clínicas parceiras.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative z-10 w-full group">
            <div className="aspect-video bg-white/5 backdrop-blur-md rounded-4xl p-4 border border-white/10 shadow-inner group-hover:border-sky-500/50 transition-all duration-700">
              <img
                src={planejamento}
                alt="Estrutura do Projeto"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SobreProjeto;
