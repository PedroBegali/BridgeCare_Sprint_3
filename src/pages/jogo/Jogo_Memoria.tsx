import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Smile, Sparkles, ShieldPlus, Stethoscope, HeartPulse, 
  BriefcaseMedical, Bandage, Syringe, RotateCcw, ArrowLeft, Trophy
} from "lucide-react";
 

 

const CartaMemoria = ({ name, isFlipped, onClick, renderIcon }: any) => (
<button
    onClick={onClick}
    className={`aspect-square flex items-center justify-center rounded-2xl transition-all duration-500 transform ${
      isFlipped
        ? "bg-white border-2 border-blue-500 rotate-0 shadow-lg"
        : "bg-blue-600 text-transparent border-2 border-blue-700 rotate-180 shadow-md hover:scale-105"
    }`}
>
<div
      className={isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      style={{ transition: "all 0.3s ease" }}
>
      {isFlipped ? renderIcon(name) : "?"}
</div>
</button>
);
 

const FeedbackVitoria = ({ moves }: { moves: number }) => (
<div className="mb-8 p-6 bg-green-100 border-2 border-green-200 rounded-2xl text-center animate-bounce flex flex-col items-center gap-2">
<h2 className="text-2xl font-black text-green-700 flex items-center gap-2">
<Trophy className="text-green-600" /> VOCÊ VENCEU!
</h2>
<p className="text-green-600 font-medium">
      Completou o desafio em {moves} movimentos.
</p>
</div>
);
 
 
const Jogo = () => {
  const iconNames = ["smile", "clean", "protection", "doctor", "health", "kit", "care", "treatment"];
 
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
 
  const renderIcon = (name: string) => {
    const props = { size: 32, className: "text-blue-600" };
    switch (name) {
      case "smile": return <Smile {...props} />;
      case "clean": return <Sparkles {...props} />;
      case "protection": return <ShieldPlus {...props} />;
      case "doctor": return <Stethoscope {...props} />;
      case "health": return <HeartPulse {...props} />;
      case "kit": return <BriefcaseMedical {...props} />;
      case "care": return <Bandage {...props} />;
      case "treatment": return <Syringe {...props} />;
      default: return null;
    }
  };
 
  const shuffleArray = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };
 
  const resetGame = () => {
    const gameCards = shuffleArray([...iconNames, ...iconNames]);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  };
 
  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }
 
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
 
    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
 
      if (cards[first] === cards[second]) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) setWon(true);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };
 
  useEffect(() => {
    resetGame();
  }, []);
 
  return (
<section className="min-h-screen bg-blue-50 py-12 px-6 flex flex-col items-center font-sans">
<div className="w-full max-w-2xl bg-white p-8 rounded-4xl shadow-xl border border-blue-100">
<div className="flex justify-between items-center mb-8">
<Link
            to="/mini-jogos"
            className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 transition-colors"
>
<ArrowLeft size={18} /> Voltar ao Menu
</Link>
<div className="text-right">
<h1 className="text-3xl font-black text-slate-900 leading-none">Memória</h1>
<p className="text-sm text-slate-500 font-medium">Saúde Bucal</p>
</div>
</div>
 
        <div className="flex items-center justify-between mb-8 bg-slate-50 p-4 rounded-2xl">
<div className="flex flex-col">
<span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Jogadas</span>
<span className="text-2xl font-black text-blue-600">{moves}</span>
</div>
<button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
>
<RotateCcw size={18} /> Reiniciar
</button>
</div>
 
        
        {won && <FeedbackVitoria moves={moves} />}
 
        <div className="grid grid-cols-4 gap-4">
          {cards.map((name, index) => (
            
<CartaMemoria 
              key={index}
              name={name}
              isFlipped={flipped.includes(index) || matched.includes(index)}
              onClick={() => handleCardClick(index)}
              renderIcon={renderIcon}
            />
          ))}
</div>
 
        <div className="mt-10 text-center text-slate-400 text-xs italic leading-relaxed">
          Combine os ícones de saúde para aprender como manter seu sorriso brilhante!
</div>
</div>
</section>
  );
};
 
export default Jogo;