import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Apple, ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { Howl } from 'howler';

import { FaAppleAlt, FaCarrot } from 'react-icons/fa';

import { GiBroccoli, GiStrawberry, GiWaterDrop, GiChocolateBar, GiDonut, GiSodaCan, GiCupcake} from 'react-icons/gi';
import { LuCandy } from "react-icons/lu";

import imgBocaAberta from '../../assets/vector-image-mouth-teeth-dentistry-260nw-2581519425.jpg';
import imgBocaFechada from '../../assets/vector-image-mouth-teeth-dentistry-260nw-2581519426.jpg';

import somAcertoUrl from '../../assets/audio/788242__bboz87__bite_3.wav'; 
import somErroUrl from '../../assets/audio/759838__noisyredfox__error3.ogg'; 

const somAcerto = new Howl({ src: [somAcertoUrl], volume: 0.5 });
const somErro = new Howl({ src: [somErroUrl], volume: 0.4 });

const TEMPO_JOGO = 30; 

const ALIMENTOS = [
  { id: 1, icone: <FaAppleAlt color="#ff0800" />, isHealthy: true, name: 'Maçã' },
  { id: 2, icone: <GiBroccoli color="#228B22" />, isHealthy: true, name: 'Brócolis' },
  { id: 3, icone: <GiWaterDrop color="#00BFFF" />, isHealthy: true, name: 'Água' },
  { id: 4, icone: <FaCarrot color="#FF8C00" />, isHealthy: true, name: 'Cenoura' },
  { id: 5, icone: <GiStrawberry color="#ff0040" />, isHealthy: true, name: 'Morango' },
  { id: 6, icone: <LuCandy color="#ff69b4" />, isHealthy: false, name: 'Bala' },
  { id: 7, icone: <GiChocolateBar color="#8B4513" />, isHealthy: false, name: 'Chocolate' },
  { id: 8, icone: <GiDonut color="#FF1493" />, isHealthy: false, name: 'Donut' },
  { id: 9, icone: <GiSodaCan color="#A9A9A9" />, isHealthy: false, name: 'Refrigerante' },
  { id: 10, icone: <GiCupcake color="#FF69B4" />, isHealthy: false, name: 'Cupcake' },
];

type FallingItem = {
  id: string;
  icone: ReactNode;
  isHealthy: boolean;
  x: number;
  y: number;
  speed: number;
};

export default function JogoAlimentacao() {
  const [pontuacao, setPontuacao] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_JOGO);
  const [jogando, setJogando] = useState(false);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  
  const [bocaX, setBocaX] = useState(50); 
  const bocaXRef = useRef(50); 
  const containerRef = useRef<HTMLDivElement>(null);

  const [itens, setItens] = useState<FallingItem[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  
  // 2. NOVO ESTADO: Controla se a boca está fechada (mastigando)
  const [estaMordendo, setEstaMordendo] = useState(false);

  const iniciarJogo = () => {
    setPontuacao(0);
    setTempoRestante(TEMPO_JOGO);
    setJogando(true);
    setFimDeJogo(false);
    setItens([]);
    setBocaX(50);
    bocaXRef.current = 50;
    setScreenShake(false);
    setEstaMordendo(false);
  };

  useEffect(() => {
    let timer: number;
    if (jogando && tempoRestante > 0) {
      timer = window.setInterval(() => setTempoRestante((prev) => prev - 1), 1000);
    } else if (tempoRestante === 0 && jogando) {
      setJogando(false);
      setFimDeJogo(true);
      setItens([]);
    }
    return () => clearInterval(timer);
  }, [jogando, tempoRestante]);

  useEffect(() => {
    let spawner: number;
    if (jogando) {
      spawner = window.setInterval(() => {
        const alimentoSorteado = ALIMENTOS[Math.floor(Math.random() * ALIMENTOS.length)];
        const novoItem: FallingItem = {
          id: Math.random().toString(),
          icone: alimentoSorteado.icone,
          isHealthy: alimentoSorteado.isHealthy,
          x: Math.floor(Math.random() * 80) + 10, 
          y: -10, 
          speed: Math.random() * 1.5 + 1.0, 
        };
        setItens((prev) => [...prev, novoItem]);
      }, 800); 
    }
    return () => clearInterval(spawner);
  }, [jogando]);

  useEffect(() => {
    let gameLoop: number;
    if (jogando) {
      gameLoop = window.setInterval(() => {
        setItens((prev) => {
          let atualizados: FallingItem[] = [];

          for (let item of prev) {
            const novoY = item.y + item.speed;

            if (novoY > 80 && novoY < 95 && Math.abs(item.x - bocaXRef.current) < 15) {
              
              // 3. ANIMAÇÃO DE MORDIDA ACONTECE AQUI!
              setEstaMordendo(true);
              // A boca fica fechada por 250ms e depois volta a abrir
              setTimeout(() => setEstaMordendo(false), 250); 

              if (item.isHealthy) {
                setPontuacao((p) => p + 10);
                somAcerto.play();
              } else {
                setPontuacao((p) => Math.max(0, p - 5));
                somErro.play();
                setScreenShake(true);
                setTimeout(() => setScreenShake(false), 200);
              }
              continue; 
            }

            if (novoY < 110) {
              atualizados.push({ ...item, y: novoY });
            }
          }
          return atualizados;
        });
      }, 30); 
    }
    return () => clearInterval(gameLoop);
  }, [jogando]);

  const handleMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!jogando || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentX = (x / rect.width) * 100;
    
    percentX = Math.max(10, Math.min(90, percentX)); 
    
    setBocaX(percentX);
    bocaXRef.current = percentX;
  }, [jogando]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center overflow-hidden relative select-none">
      
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-5px, 0px); }
            50% { transform: translate(5px, 0px); }
            75% { transform: translate(-5px, 0px); }
          }
          .shake { animation: shake 0.2s ease-in-out; }
        `}
      </style>

      <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <Link to="/mini-jogos" className="flex items-center text-slate-600 hover:text-sky-600 transition-colors font-semibold">
          <ArrowLeft className="mr-2" size={20} />
          Voltar ao Hub
        </Link>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200">
          <span className="font-bold text-slate-700">Chuva Saudável 🍎</span>
        </div>
      </div>

      <main className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-6 md:p-10 border-b-8 border-sky-200">
        
        <div className="flex justify-between items-center bg-slate-100 rounded-2xl p-4 md:p-6 mb-8">
          <div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs md:text-sm">Pontuação</p>
            <p className="text-3xl md:text-4xl font-black text-sky-600">{pontuacao}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs md:text-sm">Tempo</p>
            <p className={`text-3xl md:text-4xl font-black ${tempoRestante <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
              00:{tempoRestante.toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {!jogando && !fimDeJogo && (
          <div className="text-center py-10 bg-sky-50 rounded-3xl border-2 border-dashed border-sky-300 mb-8">
            <Apple className="mx-auto text-sky-500 mb-4" size={48} />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Heróis vs Vilões</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-8 px-4">
              Uma chuva de alimentos! <br/> 
              <strong>Arraste ou mova a boca</strong> para engolir as comidas saudáveis e desvie dos doces.
            </p>
            <button 
              onClick={iniciarJogo}
              className="inline-flex items-center bg-sky-500 text-white font-black text-lg px-8 py-4 rounded-2xl hover:bg-sky-600 transition transform hover:-translate-y-1 shadow-lg"
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
              <p className="text-5xl font-black text-sky-600">{pontuacao}</p>
            </div>
            <div>
              <button 
                onClick={iniciarJogo}
                className="inline-flex items-center bg-sky-500 text-white font-black text-lg px-8 py-4 rounded-2xl hover:bg-sky-600 transition transform hover:-translate-y-1 shadow-lg"
              >
                <RotateCcw className="mr-2" size={24} />
                JOGAR NOVAMENTE
              </button>
            </div>
          </div>
        )}

        <div className={`transition-opacity duration-500 ${jogando ? 'opacity-100' : 'opacity-0 pointer-events-none hidden md:block'} ${!jogando && !fimDeJogo ? 'hidden' : 'block'}`}>
          <div 
            ref={containerRef}
            onPointerMove={handleMove}
            className={`relative w-full max-w-lg mx-auto h-[300px] md:h-[400px] bg-slate-800 rounded-3xl overflow-hidden shadow-inner border-4 border-slate-700 cursor-none touch-none ${screenShake ? 'shake' : ''}`}
            style={{ 
               backgroundImage: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)',
            }}
          >
            
            {itens.map((item) => (
              <div
                key={item.id}
                className="absolute text-4xl drop-shadow-md"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {item.icone}
              </div>
            ))}

            <div 
              // Removi a transition-transform para a troca de imagem ficar instantânea
              className="absolute bottom-4 w-16 h-16 md:w-20 md:h-20 drop-shadow-xl"
              style={{
                left: `${bocaX}%`,
                transform: 'translateX(-50%)',
                // 4. MÁGICA VISUAL: Troca a URL da imagem baseada no estado!
                backgroundImage: `url(${estaMordendo ? imgBocaFechada : imgBocaAberta})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '2rem'
              }}
            >
              {jogando && !estaMordendo && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-sky-800 bg-white/80 px-2 py-1 rounded-full whitespace-nowrap opacity-50">
                  Arraste-me!
                </div>
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}