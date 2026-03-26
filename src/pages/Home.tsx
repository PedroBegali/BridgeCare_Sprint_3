function Home() {
  return (
    <>
      <main>
        <section className="apresentacao">
          <div className="apresentacao__texto">
            <h1>
              Conectando
              <span className="apresentacao__texto__branco">Cuidado e</span>{" "}
              Inovando
            </h1>
            <p>
              Transformamos a experiência de cuidados de saúde através de
              soluções inovadoras que conectam pacientes, médicos e instituições
              de forma inteligente.
            </p>
            <a href="sobre_o_projeto.html">
              <b>Saiba mais!</b>
            </a>
          </div>
          <img
            className="apresentacao__imagem"
            src="img/criancaVoluntaria.png"
            alt="Dentista finalizando atendimento com uma criança e ambas estão fazendo sinal de positivo"
          />
        </section>

        <section className="interacoes">
          <span>
            <h2>Tudo que você precisa em um só lugar</h2>
            <p>
              Soluções completas e integradas para revolucionar a gestão de
              saúde
            </p>
          </span>
          <nav className="interacoes__cards">
            <div className="quadros">
              <span className="icones">🗓️</span>
              <h3>Agendamento Fácil</h3>
              <a href="contato.html" className="button">
                Quero saiber mais!
              </a>
            </div>
            <div className="quadros">
              <span className="icones">🗓️</span>
              <h3>Agendamento Fácil</h3>
              <a href="contato.html" className="button">
                Quero saiber mais!
              </a>
            </div>
            <div className="quadros">
              <span className="icones">🗓️</span>
              <h3>Agendamento Fácil</h3>
              <a href="contato.html" className="button">
                Quero saiber mais!
              </a>
            </div>
          </nav>
        </section>
      </main>
    </>
  );
}
export default Home;
