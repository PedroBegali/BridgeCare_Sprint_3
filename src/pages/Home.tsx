import { Link } from "react-router-dom";
import { Calendar, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import criancaVoluntaria from "../assets/criancaVoluntaria.png";

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
    </main>
  );
}

export default Home;
