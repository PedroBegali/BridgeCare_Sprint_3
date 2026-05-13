import { Link } from "react-router-dom";
import githubIcon from "../assets/github_icon.png";
import linkedlnIcon from "../assets/linkedIn_icon.png";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-8 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white tracking-tight">
              BridgeCare
            </h3>
            <p className="text-base leading-relaxed opacity-80">
              Challenge Turma do Bem. Unindo tecnologia e solidariedade para
              democratizar o acesso à saúde bucal.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Navegação</h4>
            <ul className="space-y-2 text-base font-medium">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-blue-400 transition-colors"
                >
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link
                  to="/mini-jogos"
                  className="hover:text-blue-400 transition-colors"
                >
                  Mini Jogos
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">
              Desenvolvido por
            </h4>
            <div className="space-y-4">
              
              {/* Alan Christopher */}
              <div className="border-l-2 border-slate-700 pl-3 hover:border-blue-500 transition-colors group">
                <p className="font-bold text-slate-100 text-base">
                  Alan Christopher G. Miranda
                </p>
                <p className="opacity-60 text-xs">RM: 567033</p>
                <div className="flex gap-4 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <a
                    href="https://github.com/alanchristophermiranda2005-coder"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-6 h-6 invert hover:-translate-y-1 transition-transform"
                      src={githubIcon}
                      alt="Github"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alanchristophergonzagamiranda/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-6 h-6 invert hover:-translate-y-1 transition-transform"
                      src={linkedlnIcon}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>

              {/* Lucas Dudena */}
              <div className="border-l-2 border-slate-700 pl-3 hover:border-blue-500 transition-colors group">
                <p className="font-bold text-slate-100 text-base">
                  Lucas de Souza Dudena
                </p>
                <p className="opacity-60 text-xs">RM: 567600</p>
                <div className="flex gap-4 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <a
                    href="https://github.com/ldudena"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-6 h-6 invert hover:-translate-y-1 transition-transform"
                      src={githubIcon}
                      alt="Github"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lucas-de-souza-dudena-079646382"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-6 h-6 invert hover:-translate-y-1 transition-transform"
                      src={linkedlnIcon}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>

              {/* Pedro Begali */}
              <div className="border-l-2 border-slate-700 pl-3 hover:border-blue-500 transition-colors group">
                <p className="font-bold text-slate-100 text-base">Pedro Begali Campos</p>
                <p className="opacity-60 text-xs">RM: 567478</p>
                <div className="flex gap-4 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <a
                    href="https://github.com/PedroBegali"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-6 h-6 invert hover:-translate-y-1 transition-transform"
                      src={githubIcon}
                      alt="Github"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pedro-begalli-604208351/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-6 h-6 invert hover:-translate-y-1 transition-transform"
                      src={linkedlnIcon}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Rodapé Base (Atualizado para texto pouca coisa maior e ano 2026) */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
          <p>&copy; 2026 BridgeCare. Todos os direitos reservados.</p>
          <p>Challenge TdB - FIAP</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;