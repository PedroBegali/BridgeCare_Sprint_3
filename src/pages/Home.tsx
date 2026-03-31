import { Link } from "react-router-dom";

function Home() {
  const diferenciais = [
    { id: 1, titulo: "Agendamento Fácil", icon: "🗓️", desc: "Marque consultas em segundos pelo nosso portal." },
    { id: 2, titulo: "Rede Ampla", icon: "🏥", desc: "Conectamos você às melhores instituições de saúde." },
    { id: 3, titulo: "Histórico Seguro", icon: "🔒", desc: "Seus dados protegidos e acessíveis em um só lugar." },
  ];

  return (
    <main className="animate-in fade-in duration-700">
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Conectando <span className="text-blue-600">Cuidado</span> e Inovando a Saúde
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
            Transformamos a experiência de saúde através de soluções inteligentes que unem pacientes e médicos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link 
              to="/sobre" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-lg shadow-blue-200"
            >
              Saiba mais sobre o projeto
            </Link>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute -z-10 inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 transform scale-75"></div>
          <img
            className="rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
            src="img/criancaVoluntaria.png"
            alt="Dentista e criança fazendo sinal de positivo"
          />
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Soluções completas e integradas para revolucionar a forma como cuidamos do que mais importa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diferenciais.map((card) => (
              <div key={card.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{card.icon}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.titulo}</h3>
                <p className="text-slate-500 mb-6">{card.desc}</p>
                <Link to="/contato" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Quero saber mais <span>→</span>
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