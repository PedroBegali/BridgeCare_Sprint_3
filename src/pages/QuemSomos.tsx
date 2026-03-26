function QuemSomos() {
  return (
    <>
      <main className="integrantes">
        <section className="integrantes__descricao">
          <span className="integrantes__descricao__membro">
            <img
              className="integrantes__descricao__membro__foto"
              src="img/pedroPerfil.jpg"
              alt="Foto Pedro B."
            />
            <h3>
              Pedro Begali Campos
              <p>RM: 567478</p>
              <a href="https://github.com/PedroBegali">
                <img
                  className="integrantes__icon"
                  src="img/github_icon.png"
                  alt="Github icone"
                />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/   pedro-begalli-604208351/">
                <img
                  className="integrantes__icon"
                  src="img/linkedIn_icon.png"
                  alt="LinkedIn icone"
                />
                LinkedIn
              </a>
            </h3>
          </span>
          <span className="integrantes__descricao__membro">
            <img
              className="integrantes__descricao__membro__foto"
              src="img/lucasPerfil.jpg"
              alt="Foto Lucas D."
            />
            <h3>
              Lucas de Souza Dudena
              <p>RM: 567600</p>
              <a href="https://github.com/ldudena">
                <img
                  className="integrantes__icon"
                  src="img/github_icon.png"
                  alt="Github icone"
                />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/   lucas-de-souza-dudena-079646382?utm_source=share&  utm_campaign=share_via&utm_content=profile&   utm_medium=ios_app ">
                <img
                  className="integrantes__icon"
                  src="img/linkedIn_icon.png"
                  alt="LinkedIn icone"
                />
                LinkedIn
              </a>
            </h3>
          </span>
        </section>
      </main>
    </>
  );
}
export default QuemSomos;
