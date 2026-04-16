import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: "/quem-somos", label: "Quem somos" },
    { to: "/sobre", label: "Sobre o projeto" },
    { to: "/mini-jogos", label: "Mini jogos" },
    { to: "/doadores", label: "Doadores" },
    { to: "/programas-sociais", label: "Programas Sociais" },
    { to: "/relatorios", label: "Relatórios" },
    { to: "/faq", label: "FAQ" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          className="flex items-center gap-2 group"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <h1 className="text-2xl font-black text-blue-700 tracking-tight group-hover:text-blue-500 transition-colors">
            Bridge<span className="text-blue-400">Care</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
            to="/login"
          >
            <User size={18} />
            <span className="hidden lg:inline">Conecte-se</span>
          </Link>

          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 p-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold active:scale-95 transition-all"
            to="/login"
            onClick={() => setIsMenuOpen(false)}
          >
            <User size={20} />
            Conecte-se
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
