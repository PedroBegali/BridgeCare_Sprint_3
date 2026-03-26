import { useState } from 'react';

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  return (
    <main className="contato">
      <section className="container">
        <h1 className="contato__titulo">Entre em Contato</h1>

        <form className="formulario" onSubmit={(e) => e.preventDefault()}>
          
          <div className="campo">
            <label htmlFor="nome">Nome Completo:</label>
            <input 
              type="text" 
              id="nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Digite seu nome"
            />
          </div>

          <div className="campo">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="campo">
            <label htmlFor="txtTel">Telefone:</label>
            <input type="tel" id="txtTel" />
          </div>

          <div className="campo">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea id="mensagem" rows={4}></textarea>
          </div>

          <button type="submit" className="formulario__button">
            Enviar Mensagem
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contato;