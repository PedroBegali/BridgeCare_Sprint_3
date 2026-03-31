// src/pages/jogo/Jogo.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jogo = () => {
  const emojis = ["🦷", "😁", "🪥", "💉", "❤️", "⭐", "🏥", "👨‍⚕️"];

  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const shuffleArray = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const resetGame = () => {
    const gameCards = shuffleArray([...emojis, ...emojis]);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
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
    <section className="min-h-screen bg-blue-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-[2rem] shadow-xl border border-blue-100">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/mini-jogos"
            className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 transition-colors"
          >
            ← Voltar ao Menu
          </Link>
          <div className="text-right">
            <h1 className="text-3xl font-black text-slate-900 leading-none">
              Memória
            </h1>
            <p className="text-sm text-slate-500 font-medium">Saúde Bucal</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 bg-slate-50 p-4 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Jogadas
            </span>
            <span className="text-2xl font-black text-blue-600">{moves}</span>
          </div>
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            🔄 Reiniciar
          </button>
        </div>

        {won && (
          <div className="mb-8 p-6 bg-green-100 border-2 border-green-200 rounded-2xl text-center animate-bounce">
            <h2 className="text-2xl font-black text-green-700">
              🎉 VOCÊ VENCEU!
            </h2>
            <p className="text-green-600 font-medium">
              Completou o desafio em {moves} movimentos.
            </p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {cards.map((emoji, index) => {
            const isFlipped =
              flipped.includes(index) || matched.includes(index);

            return (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`aspect-square flex items-center justify-center text-4xl rounded-2xl transition-all duration-500 transform ${
                  isFlipped
                    ? "bg-white border-2 border-blue-500 rotate-0 shadow-lg"
                    : "bg-blue-600 text-transparent border-2 border-blue-700 rotate-180 shadow-md hover:scale-105"
                }`}
              >
                <span
                  className={
                    isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }
                  style={{ transition: "all 0.3s ease" }}
                >
                  {isFlipped ? emoji : "?"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center text-slate-400 text-xs italic">
          Combine os itens para aprender sobre o que faz o seu sorriso brilhar!
        </div>
      </div>
    </section>
  );
};

export default Jogo;
