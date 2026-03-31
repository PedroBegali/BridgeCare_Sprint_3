import { Link } from "react-router-dom";

const MiniJogos = () => {
  const games = [
    {
      id: "memoria",
      titulo: "Jogo da Memória",
      descricao: "Encontre os pares dos instrumentos e hábitos saudáveis!",
      icone: "🦷",
      disponivel: true,
      cor: "bg-blue-500",
    },
    {
      id: "escovacao",
      titulo: "Escovação Ninja",
      descricao: "Elimine as bactérias antes que o tempo acabe!",
      icone: "🪥",
      disponivel: false,
      cor: "bg-green-500",
    },
    {
      id: "quiz",
      titulo: "Quiz do Sorriso",
      descricao: "Você sabe tudo sobre saúde bucal? Teste seus conhecimentos!",
      icone: "✨",
      disponivel: false,
      cor: "bg-purple-500",
    },
  ];

  return (
    <main className="py-16 px-6 bg-gray-100 min-h-screen">
      <section className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Mundo dos <span className="text-blue-600">Jogos</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Aprender a cuidar do seu sorriso nunca foi tão divertido! Escolha um
            desafio abaixo:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className={`relative overflow-hidden rounded-[2.5rem] p-8 shadow-xl transition-all duration-300 ${
                game.disponivel
                  ? "bg-white hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-b-8 border-blue-200"
                  : "bg-slate-100 grayscale opacity-80 cursor-not-allowed border-b-8 border-slate-300"
              }`}
            >
              {!game.disponivel && (
                <div className="absolute top-4 right-4 bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Em breve
                </div>
              )}

              <div
                className={`${game.cor} w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg`}
              >
                {game.icone}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {game.titulo}
              </h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                {game.descricao}
              </p>

              {game.disponivel ? (
                <Link
                  to={`/mini-jogos/${game.id}`}
                  className="inline-block w-full text-center bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-md"
                >
                  JOGAR AGORA!
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-300 text-slate-500 font-bold py-4 rounded-2xl"
                >
                  BLOQUEADO
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MiniJogos;
