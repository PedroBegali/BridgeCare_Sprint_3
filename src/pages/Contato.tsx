import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Mail, CheckCircle2, Send } from "lucide-react";

type ContatoFormData = {
  nome: string;
  email: string;
  tel: string;
  mensagem: string;
};

const Contato = () => {
  const [enviado, setEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContatoFormData>();

  const onSubmit = (data: ContatoFormData) => {
    console.log("Dados validados com UseForm:", data);
    setEnviado(true);

    setTimeout(() => {
      setEnviado(false);
      reset();
    }, 4000);
  };

  return (
    <main className="py-16 px-6 bg-slate-50 min-h-screen">
      <section className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                Entre em <span className="text-blue-600">Contato</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Tem alguma dúvida sobre os nossos serviços ou quer saber como
                apoiar a Turma do Bem? Nossa equipe está pronta para te atender.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Localização
                  </h4>
                  <p className="text-slate-500 text-sm">
                    São Paulo, SP - Brasil
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">E-mail</h4>
                  <p className="text-slate-500 text-sm">
                    contato@bridgecare.com.br
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
            {enviado && (
              <div className="absolute inset-0 bg-blue-600/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={64} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                <p className="opacity-90">Entraremos em contato em breve.</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label
                  htmlFor="nome"
                  className="text-sm font-bold text-slate-700"
                >
                  Nome Completo
                </label>
                <input
                  {...register("nome", { required: "O nome é obrigatório" })}
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                    errors.nome
                      ? "border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:ring-blue-500"
                  } focus:ring-2`}
                  placeholder="Digite seu nome"
                />
                {errors.nome && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.nome.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700"
                >
                  E-mail
                </label>
                <input
                  {...register("email", {
                    required: "O e-mail é obrigatório",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Insira um e-mail válido",
                    },
                  })}
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:ring-blue-500"
                  } focus:ring-2`}
                  placeholder="exemplo@email.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tel"
                  className="text-sm font-bold text-slate-700"
                >
                  Telefone
                </label>
                <input
                  {...register("tel", { required: "O telefone é obrigatório" })}
                  type="tel"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                    errors.tel
                      ? "border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:ring-blue-500"
                  } focus:ring-2`}
                  placeholder="(11) 99999-9999"
                />
                {errors.tel && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.tel.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mensagem"
                  className="text-sm font-bold text-slate-700"
                >
                  Mensagem
                </label>
                <textarea
                  {...register("mensagem", {
                    required: "A mensagem não pode estar vazia",
                    minLength: {
                      value: 10,
                      message: "A mensagem deve ter pelo menos 10 caracteres",
                    },
                  })}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                    errors.mensagem
                      ? "border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:ring-blue-500"
                  } focus:ring-2`}
                  placeholder="Como podemos ajudar?"
                ></textarea>
                {errors.mensagem && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.mensagem.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <Send size={18} />
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
