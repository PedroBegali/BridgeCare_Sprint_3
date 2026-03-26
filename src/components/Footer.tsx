import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="rodape">
        <div className="rodape__container">
          <div className="rodape__vertical">
            <h3>BridgeCare</h3>
            <p>Challange Turma do bem.</p>
          </div>

          <div className="rodape__vertical">
            <h4>Links Úteis</h4>
            <ul>
              <li>
                <Link to="index.html">Início</Link>
              </li>
              <li>
                <Link to="app.js">Serviços</Link>
              </li>
              <li>
                <Link to="sobre_o_projeto.html">Sobre</Link>
              </li>
              <li>
                <Link to="contato.html">Contato</Link>
              </li>
            </ul>
          </div>

          <div className="rodape__vertical">
            <h4>Siga-nos</h4>
            <div className="social-links">
              <Link to="https://github.com/PedroBegali">
                <img
                  className="rodape__icon"
                  src="img/github_icon.png"
                  alt="Github icone"
                />
                Github Pedro B.
              </Link>
              <Link to="https://github.com/ldudena">
                <img
                  className="rodape__icon"
                  src="img/github_icon.png"
                  alt="Github icone"
                />
                Github Lucas D.
              </Link>
              <Link to="https://www.linkedin.com/in/   pedro-begalli-604208351/">
                <img
                  className="rodape__icon"
                  src="img/linkedIn_icon.png"
                  alt="LinkedIn icone"
                />
                LinkedIn Pedro B.
              </Link>
              <Link to="https://www.linkedin.com/in/   lucas-de-souza-dudena-079646382?utm_source=share&  utm_campaign=share_via&utm_content=profile&   utm_medium=ios_app ">
                <img
                  className="rodape__icon"
                  src="img/linkedIn_icon.png"
                  alt="LinkedIn icone"
                />
                LinkedIn Lucas D.
              </Link>
            </div>
          </div>
        </div>

        <div className="rodape__reservado">
          <p>&copy; 2025 BridgeCare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
export default Footer;
