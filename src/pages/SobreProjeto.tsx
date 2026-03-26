function Contato() {
  return (
    <>
      <main className="sobre_projeto">
        <section className="sobre_projeto_introducao">
          <div className="conteudo-texto">
            <h1>Sobre o Projeto</h1>
            <h3 className="subtitulo_projeto">
              Nosso projeto busca resolver oproblema da descentralização das
              informações e aumentar a coleta dedados!
            </h3>

            <p>
              Criaremos um site oficial para atender as chamadas em um
              únicocanal. A home do site será estruturada em três pilares
              principais:
            </p>
            <ul>
              <li>
                <span className="sobre_projeto_introducao_icones">📜</span>{" "}
                História: Quem somos,reforçando credibilidade.
              </li>
              <li>
                <span className="sobre_projeto_introducao_icones">💰</span>{" "}
                Recursos: Ajudavoluntária e financeira.
              </li>
              <li>
                <span className="sobre_projeto_introducao_icones">🎯</span>{" "}
                Objetivo: Conectar aspessoas que são o foco do projeto.
              </li>
            </ul>
          </div>

          <div className="sobre_projeto_imagens">
            <img
              src="img/turmadobem.jpg"
              alt="logo-turma do bem"
              className="imagem-ong"
            />
            <img
              src="img/pessoa_smartphone.png"
              alt="Pessoa buscando um local no gps do celular"
              className="imagem-ong"
            />
          </div>
        </section>

        <section className="desenvolvimento">
          <img
            src="img/planejamento.png"
            alt="Muitos papéis jogados em uma mesa"
            className="roadMap"
          />
          <div className="conteudo-texto">
            <h1>Planejamento e Expectativas</h1>
            <p>Nossa solução tem como foco atender dois públicos principais:</p>
            <ul>
              <li>
                Beneficiários: Simplificaremos o preenchimento de dados e
                tornaremos a experiência mais atrativa com mini jogos
                interativos.
              </li>

              <li>
                Doadores: Criaremos um plano de assinaturas com benefícios em
                clínicas parceiras, kits promocionais e opção de doação única
                com segurança e facilidade.
              </li>
            </ul>

            <br />

            <h3>COMO FAREMOS...</h3>

            <p>
              A home do site triangulada, nos apoiando em três pilares que
              julgamos importantes, confiabilidade, recursos materiais ou
              financeiros e o objetivo que é ajudar à quem precisa, pensando na
              informação principal que estará destacada ao centro, para o
              usuário navegar de forma intuitiva, para se cadastrar no programa,
              verificar as datas das triagens e entrar como beneficiário.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
export default Contato;
