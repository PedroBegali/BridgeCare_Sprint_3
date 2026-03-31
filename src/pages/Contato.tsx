import { useState } from 'react';

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", { nome, email, tel, mensagem });
    setEnviado(true);
    
    setTimeout(() => {
      setEnviado(false);
      setNome('');
      setEmail('');
      setTel('');
      setMensagem('');
    }, 4000);
  };

  return (
    <main className="py-16 px-6 bg-slate-50 min-h-screen">
      <section className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Entre em <span className="text-blue-600">Contato</span></h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Tem alguma dúvida sobre os nossos serviços ou quer saber como apoiar a Turma do Bem? Nossa equipe está pronta para te atender.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">📍</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Localização</h4>
                  <p className="text-slate-500 text-sm">São Paulo, SP - Brasil</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">✉️</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">E-mail</h4>
                  <p className="text-slate-500 text-sm">contato@bridgecare.com.br</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
            
            {enviado && (
              <div className="absolute inset-0 bg-blue-600/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in zoom-in duration-300">
                <span className="text-6xl mb-4">✅</span>
                <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                <p className="opacity-90">Obrigado, {nome.split(' ')[0]}. Entraremos em contato em breve.</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="nome" className="text-sm font-bold text-slate-700">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="exemplo@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tel" className="text-sm font-bold text-slate-700">Telefone</label>
                <input 
                  type="tel" 
                  id="tel" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="mensagem" className="text-sm font-bold text-slate-700">Mensagem</label>
                <textarea 
                  id="mensagem" 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contato;