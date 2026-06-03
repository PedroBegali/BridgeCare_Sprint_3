import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Sparkles, ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { Howl } from 'howler';

// Importações de imagem e áudios
import imgBoca from '../../assets/boca_desenho.avif';
import somSquishUrl from '../../assets/audio/495118__nebulasnails__wet-splat-1.mp3';
// NOVO: Importe o seu som de erro aqui!
import somErroUrl from '../../assets/audio/759838__noisyredfox__error3.ogg'; 

// Configuração dos áudios
const somEsmagar = new Howl({
  src: [somSquishUrl],
  volume: 0.6,
});

// NOVO: Configuração do som de erro
const somErro = new Howl({
  src: [somErroUrl],
  volume: 0.4, // Volume um pouco mais baixo para não assustar
});

const TEMPO_JOGO = 30; 
const TOTAL_DENTES = 10; 

const POSICOES_DENTES = [
  // Dentes Superiores
  { top: '40%', left: '25%',width: '12%', height: '20%' }, 
  { top: '42%', left: '41%',width: '14%', height: '25%' }, 
  { top: '42%', left: '59%',width: '14%', height: '25%' }, 
  { top: '40%', left: '74%',width: '12%', height: '23%' }, 
  { top: '40%', left: '86%',width: '10%', height: '20%' }, 
  
  // Dentes Inferiores
  { top: '60%', left: '30%' ,width: '9%', height: '15%'}, 
  { top: '62%', left: '43%',width: '12%', height: '15%' }, 
  { top: '62%', left: '57%',width: '12%', height: '15%' }, 
  { top: '62%', left: '69%',width: '10%', height: '18%' }, 
  { top: '60%', left: '80%',width: '8%', height: '14%' }, 
];

export default function JogoEscovacao() {
  const [pontuacao, setPontuacao] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_JOGO);
  const [jogando, setJogando] = useState(false);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [dentesInfectados, setDentesInfectados] = useState<number[]>([]);
  
  const [manchas, setManchas] = useState<{id: number, index: number}[]>([]);
  const [screenShake, setScreenShake] = useState(false);

  const iniciarJogo = () => {
    setPontuacao(0);
    setTempoRestante(TEMPO_JOGO);
    setJogando(true);
    setFimDeJogo(false);
    setDentesInfectados([]);
    setManchas([]);
    setScreenShake(false);
  };

  useEffect(() => {
    let timer: number;
    if (jogando && tempoRestante > 0) {
      timer = window.setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0 && jogando) {
      setJogando(false);
      setFimDeJogo(true);
      setDentesInfectados([]);
      setManchas([]);
      setScreenShake(false);
    }
    return () => clearInterval(timer);
  }, [jogando, tempoRestante]);

  useEffect(() => {
    let intervaloBacterias: number;
    if (jogando) {
      intervaloBacterias = window.setInterval(() => {
        setDentesInfectados((prev) => {
          if (prev.length >= 4) return prev; 
          const novoDente = Math.floor(Math.random() * TOTAL_DENTES);
          if (!prev.includes(novoDente)) {
            return [...prev, novoDente];
          }
          return prev;
        });
      }, 800);
    }
    return () => clearInterval(intervaloBacterias);
  }, [jogando]);

  const escovarDente = useCallback((index: number) => {
    if (!jogando) return;

    if (dentesInfectados.includes(index)) {
      // ACERTOU O ALVO
      setPontuacao((prev) => prev + 10);
      setDentesInfectados((prev) => prev.filter((d) => d !== index));
      
      const manchaId = Date.now() + Math.random();
      setManchas(prev => [...prev, { id: manchaId, index }]);
      
      somEsmagar.play();
      
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 200);

      setTimeout(() => {
        setManchas(prev => prev.filter(m => m.id !== manchaId));
      }, 600);

    } else {
      // ERROU O ALVO (Clicou em um dente limpo)
      setPontuacao((prev) => Math.max(0, prev - 2)); 
      
      // NOVO: Toca o som de erro
      somErro.play();
      
      // NOVO: Treme a tela para indicar o erro
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 200);
    }
  }, [jogando, dentesInfectados]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center overflow-hidden relative">
      
      <style>
        {`
          @keyframes splat-anim {
            0% { transform: scale(0.1) rotate(0deg); opacity: 1; }
            30% { transform: scale(1.3) rotate(-5deg); opacity: 1; }
            100% { transform: scale(1.1) rotate(-10deg); opacity: 0; }
          }
          @keyframes shake {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-4px, 1px); }
            50% { transform: translate(4px, -1px); }
            75% { transform: translate(-2px, -1px); }
          }
          .animacao-gosma {
            animation: splat-anim 0.6s ease-out forwards;
          }
          .shake {
            animation: shake 0.2s ease-in-out;
          }
        `}
      </style>

      <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <Link 
          to="/mini-jogos" 
          className="flex items-center text-slate-600 hover:text-blue-600 transition-colors font-semibold"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar ao Hub
        </Link>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200">
          <span className="font-bold text-slate-700">Escovação Ninja 🥷</span>
        </div>
      </div>

      <main className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-6 md:p-10 border-b-8 border-green-200">
        
        <div className="flex justify-between items-center bg-slate-100 rounded-2xl p-4 md:p-6 mb-8">
          <div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs md:text-sm">Pontuação</p>
            <p className="text-3xl md:text-4xl font-black text-green-600">{pontuacao}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs md:text-sm">Tempo</p>
            <p className={`text-3xl md:text-4xl font-black ${tempoRestante <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
              00:{tempoRestante.toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {!jogando && !fimDeJogo && (
          <div className="text-center py-10 bg-green-50 rounded-3xl border-2 border-dashed border-green-300 mb-8">
            <Sparkles className="mx-auto text-green-500 mb-4" size={48} />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Pronto para a ação?</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-8 px-4">
              As bactérias vão aparecer nos dentes! Clique nelas o mais rápido que puder para limpar a boca e ganhar pontos. Cuidado para não escovar o dente limpo, ou perderá pontos!
            </p>
            <button 
              onClick={iniciarJogo}
              className="inline-flex items-center bg-green-500 text-white font-black text-lg px-8 py-4 rounded-2xl hover:bg-green-600 transition transform hover:-translate-y-1 shadow-lg"
            >
              <Play className="mr-2 fill-current" size={24} />
              COMEÇAR AGORA
            </button>
          </div>
        )}

        {fimDeJogo && (
          <div className="text-center py-10 bg-blue-50 rounded-3xl border-2 border-dashed border-blue-300 mb-8 animate-in fade-in zoom-in duration-300">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Fim de Jogo!</h2>
            <div className="bg-white p-6 rounded-2xl inline-block shadow-md mb-8 mt-4">
              <p className="text-slate-500 font-medium">Pontuação Final</p>
              <p className="text-5xl font-black text-blue-600">{pontuacao}</p>
            </div>
            <div>
              <button 
                onClick={iniciarJogo}
                className="inline-flex items-center bg-blue-500 text-white font-black text-lg px-8 py-4 rounded-2xl hover:bg-blue-600 transition transform hover:-translate-y-1 shadow-lg"
              >
                <RotateCcw className="mr-2" size={24} />
                JOGAR NOVAMENTE
              </button>
            </div>
          </div>
        )}

        <div className={`transition-opacity duration-500 ${jogando ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div 
            className={`relative w-full max-w-2xl mx-auto aspect-4/3 bg-slate-100 rounded-3xl overflow-hidden shadow-inner border-4 border-slate-200 ${screenShake ? 'shake' : ''}`}
            style={{
              backgroundImage: `url(${imgBoca})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#fad4d4' 
            }}
          >
            
            {POSICOES_DENTES.map((posicao, index) => {
              const estaInfectado = dentesInfectados.includes(index);
              const temMancha = manchas.some(m => m.index === index);
              
              return (
                <button
                  key={index}
                  onClick={() => escovarDente(index)}
                  className={`
                    absolute flex items-center justify-center
                    -translate-x-1/2 -translate-y-1/2
                    bg-transparent border-transparent outline-none
                    ${estaInfectado 
                      ? 'cursor-crosshair z-10 scale-110 transition-transform duration-200' 
                      : 'cursor-default' 
                    }
                  `}
                  style={{ 
                    top: posicao.top, 
                    left: posicao.left,
                    width: posicao.width,
                    height: posicao.height
                  }}
                >
                  {estaInfectado && (
                    <Bug size={40} className="text-lime-500 fill-current animate-bounce drop-shadow-md" />
                  )}
                  
                  {temMancha && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <svg 
                        viewBox="0 0 200 200" 
                        className="w-28 h-28 fill-lime-500 drop-shadow-md animacao-gosma"
                      >
                        <path d="M96.8,19.3 C116.4,12,136,25.6,140,46.1 c18.5,1.7,33.5,16.5,33.5,35.1 c0,3.3-0.5,6.5-1.4,9.5 c13.7,14.6,13.2,37.6-1.5,51.6 c-5.5,5.2-12.7,8.3-20.3,8.7 c-0.6,18.8-16.1,33.8-35,33.5 c-5.8-0.1-11.4-1.6-16.3-4.3 c-12,16-35.3,18.8-50.8,6.2 c-5.5-4.5-9.4-10.8-11-17.8 c-18.7,4.3-37.4-7.4-41.6-26 c-1.3-5.8-0.9-11.8,1.2-17.3 c-16.8-11.3-20.6-34.6-8.5-50.6 c4.3-5.7,10.2-9.9,17-12 c-4-19.1,8.3-37.8,27.5-41.8 c4.6-1,9.4-1.1,14-0.3 C58.3,13.6,80.1,8.6,96.8,19.3z" />
                        <circle cx="175" cy="25" r="10" />
                        <circle cx="20" cy="165" r="12" />
                        <circle cx="180" cy="160" r="8" />
                        <circle cx="25" cy="50" r="14" />
                        <circle cx="95" cy="5" r="8" />
                        <circle cx="130" cy="190" r="9" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
            
          </div>
          
          {jogando && (
            <p className="text-center text-slate-500 font-medium mt-6 animate-pulse">
              Clique nas bactérias em cima dos dentes para escovar!
            </p>
          )}
        </div>

      </main>
    </div>
  );
}