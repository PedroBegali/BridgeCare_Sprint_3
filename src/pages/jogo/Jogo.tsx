// src/pages/jogo/Jogo.tsx
import { useEffect, useState } from "react";
import styles from "./styleGame.module.css";

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
    <section className={styles.sectionGame}>
      <div className={styles.gameWrapper}>
        <div className={styles.header}>
          <h1 className="text-3xl font-bold mb-2">Jogo da Memória</h1>
          <p className="text-gray-600">Encontre os pares da saúde bucal!</p>
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.statsBar}>
            <span className={styles.movesText}>Jogadas: {moves}</span>
            <button onClick={resetGame} className={styles.resetBtn}>
              🔄 Reiniciar
            </button>
          </div>

          {won && (
            <div className={styles.winMessage}>
              🎉 Parabéns! Você venceu em {moves} jogadas!
            </div>
          )}

          <div className={styles.grid}>
            {cards.map((emoji, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              
              return (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`${styles.card} ${
                    isFlipped ? styles.cardOpen : styles.cardClosed
                  }`}
                >
                  {isFlipped ? emoji : "?"}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jogo;