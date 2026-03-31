import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link className="flex items-center gap-2 group" to="/">
          <h1 className="text-2xl font-black text-blue-700 tracking-tight group-hover:text-blue-500 transition-colors">
            Bridge<span className="text-blue-400">Care</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link
            to="/quem-somos"
            className="hover:text-blue-600 transition-colors"
          >
            Quem somos
          </Link>
          <Link to="/sobre" className="hover:text-blue-600 transition-colors">
            Sobre o projeto
          </Link>
          <Link
            to="/mini-jogos"
            className="hover:text-blue-600 transition-colors"
          >
            Mini jogos
          </Link>
          <Link to="/faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
          <Link to="/contato" className="hover:text-blue-600 transition-colors">
            Contato
          </Link>
        </nav>

        <Link
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
          to="#"
        >
          <img
            src="img/login_icon.png"
            alt="Ícone de login"
            className="w-5 h-5 brightness-0 invert"
          />
          Conecte-se
        </Link>
      </div>
    </header>
  );
}

export default Header;
