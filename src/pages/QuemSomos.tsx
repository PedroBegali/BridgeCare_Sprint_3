import perfilLucas from "../assets/lucasPerfil.jpg"
import perfilPedro from "../assets/pedroPerfil.jpg"
import perfilAlan from "../assets/alanPerfil.jpeg"
import githubIcon from "../assets/github_icon.png"
import linkedlnIcon from "../assets/linkedIn_icon.png"

function QuemSomos() {
  const integrantes = [
    {
      nome: "Pedro Begali Campos",
      rm: "567478",
      foto: (perfilPedro),
      github: "https://github.com/PedroBegali",
      linkedin: "https://www.linkedin.com/in/pedro-begalli-604208351/",
    },
    {
      nome: "Lucas de Souza Dudena",
      rm: "567600",
      foto: (perfilLucas),
      github: "https://github.com/ldudena",
      linkedin: "https://www.linkedin.com/in/lucas-de-souza-dudena-079646382",
    },
    {
      nome: "Alan Christopher G. Miranda",
      rm: "567033",
      foto: (perfilAlan),
      github: "https://github.com/alanchristophermiranda2005-coder",
      linkedin: "https://www.linkedin.com/in/alanchristophergonzagamiranda/",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <section className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Nossa Equipe
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Conheça os desenvolvedores por trás da BridgeCare, trabalhando para
            inovar o cuidado com a saúde bucal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {integrantes.map((membro, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full scale-105 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
                  src={membro.foto}
                  alt={`Foto de ${membro.nome}`}
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {membro.nome}
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-6 uppercase tracking-wider">
                RM: {membro.rm}
              </p>

              <div className="flex gap-4 mt-auto">
                <a
                  href={membro.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-slate-50 rounded-full hover:bg-slate-900 group/icon transition-colors"
                >
                  <img
                    className="w-5 h-5 group-hover/icon:invert transition-all"
                    src={githubIcon}
                    alt="Github"
                  />
                </a>
                <a
                  href={membro.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-slate-50 rounded-full hover:bg-blue-600 group/icon transition-colors"
                >
                  <img
                    className="w-5 h-5 group-hover/icon:invert transition-all"
                    src={linkedlnIcon}
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default QuemSomos;
