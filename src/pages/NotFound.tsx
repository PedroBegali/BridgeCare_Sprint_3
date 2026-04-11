import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>

      <div className="container max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3.5rem] shadow-2xl text-center relative z-10">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600/20 rounded-3xl text-blue-400 mb-8 animate-bounce-slow">
          <FileQuestion size={48} />
        </div>

        <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter">
          4<span className="text-blue-500">0</span>4
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-6">
          Caminho não encontrado
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
          Parece que você se perdeu entre as pontes. A página que você procura
          não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-lg shadow-blue-600/20 active:scale-95 uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={18} />
            Voltar para a Home
          </Link>
        </div>

        <p className="mt-12 text-[10px] font-mono text-slate-500 uppercase tracking-widest opacity-50">
          Lost at: {location.pathname}
        </p>
      </div>
    </main>
  );
};

export default NotFound;
