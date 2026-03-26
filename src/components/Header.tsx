import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav className="header__menu">
        
          <Link to="/quem-somos">Quem somos</Link>
          <Link to="/sobre">Sobre o projeto</Link>
          <Link to="/mini-jogos">Mini jogos</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contato">Contato</Link>
        </nav>
        <Link className="header__logo" to="/">
          <h1>BridgeCare</h1>
        </Link>

      
        <Link className="header__botao" to="#">
          <img src="img/login_icon.png" alt="Ícone de login" />
          Conecte-se
        </Link>
      </header>
    </>
  );
}

export default Header;