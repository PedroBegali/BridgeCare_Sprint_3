import { useState } from "react";
import {
  Mail,
  Handshake,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
  Plus,
} from "lucide-react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const perguntas = [
    {
      q: "Como receber o auxílio?",
      a: "Você pode cadastrar seu telefone ou email e em breve um atendente irá entrar em contato para iniciar o processo.",
      icon: <Mail size={24} />,
    },
    {
      q: "Como posso participar?",
      a: "Você pode se inscrever como voluntário para atendimentos ou apoiar a causa financeiramente através do nosso portal de doações.",
      icon: <Handshake size={24} />,
    },
    {
      q: "Os atendimentos são gratuitos?",
      a: "Sim, todos os atendimentos oferecidos pela Turma do Bem são 100% gratuitos para os beneficiários selecionados.",
      icon: <Sparkles size={24} />,
    },
    {
      q: "Qualquer um pode participar?",
      a: "A ONG prioriza o atendimento de jovens de 11 a 17 anos e mulheres vítimas de violência em situação de vulnerabilidade.",
      icon: <Users size={24} />,
    },
    {
      q: "Quanto tempo demora até o início do tratamento?",
      a: "Como dependemos de recursos de doações, o tempo pode variar, mas trabalhamos para que o processo seja o mais ágil possível.",
      icon: <Clock size={24} />,
    },
    {
      q: "Há custo adicional durante o tratamento?",
      a: "Não. A ONG arca com todo o custo operatório e materiais do início ao fim do tratamento odontológico.",
      icon: <ShieldCheck size={24} />,
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="py-12 px-6 bg-slate-50 min-h-[70vh]">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600">
            Clique na pergunta para visualizar a resposta.
          </p>
        </div>

        <div className="space-y-4">
          {perguntas.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-blue-500 shadow-md"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`transition-transform duration-300 ${
                        isOpen
                          ? "scale-125 text-blue-600"
                          : "group-hover:scale-110 text-slate-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <h3
                      className={`font-bold transition-colors ${
                        isOpen ? "text-blue-600" : "text-slate-800"
                      }`}
                    >
                      {item.q}
                    </h3>
                  </div>

                  <Plus
                    className={`text-blue-500 transition-transform duration-500 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    size={24}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-slate-600 border-t border-slate-50 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default FAQ;
