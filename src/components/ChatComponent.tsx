import { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";

const API_BASE_URL = "https://api-backend-bridgecare.onrender.com";

export const ChatComponent = ({ idDentista, idBeneficiario, tipoUsuario, onClose }: any) => {
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const mensagensEndRef = useRef<HTMLDivElement>(null);

  const buscarMensagens = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/mensagens/${idDentista}/${idBeneficiario}`);
      if (res.ok) {
        const data = await res.json();
        setMensagens(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    buscarMensagens();
    const interval = setInterval(() => {
      buscarMensagens();
    }, 3000);
    return () => clearInterval(interval);
  }, [idDentista, idBeneficiario]);

  useEffect(() => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = async (e: any) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    const payload = {
      idDentista,
      idBeneficiario,
      enviadoPor: tipoUsuario,
      texto: novaMensagem
    };

    setNovaMensagem("");

    try {
      await fetch(`${API_BASE_URL}/mensagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      buscarMensagens();
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md h-150 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        <div className="bg-blue-600 p-5 flex justify-between items-center text-white shrink-0">
          <div>
            <h3 className="font-black text-lg">Mensagens</h3>
            <p className="text-xs text-blue-200 font-medium">Conexão segura</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
          {mensagens.map((msg) => {
            const isMinha = msg.enviadoPor === tipoUsuario;
            return (
              <div key={msg.idMensagem} className={`max-w-[80%] flex flex-col ${isMinha ? "self-end" : "self-start"}`}>
                <div className={`p-3 rounded-2xl text-sm ${isMinha ? "bg-blue-600 text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"}`}>
                  <p>{msg.texto}</p>
                </div>
                <span className={`text-[10px] text-slate-400 font-bold mt-1 ${isMinha ? "text-right" : "text-left"}`}>
                  {msg.dataEnvio}
                </span>
              </div>
            );
          })}
          <div ref={mensagensEndRef} />
        </div>

        <form onSubmit={enviarMensagem} className="p-4 bg-white border-t border-slate-100 flex gap-2 shrink-0">
          <input
            type="text"
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm"
          />
          <button type="submit" disabled={!novaMensagem.trim()} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};