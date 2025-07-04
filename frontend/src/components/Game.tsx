import React, { useState, useEffect } from 'react';

const Game: React.FC = () => {
  const [wordLength, setWordLength] = useState<number>(5);
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<{ word: string; feedback: string[] }[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(0);
  const [stats, setStats] = useState<{ wins: number; streak: number; averageAttempts: string; gamesPlayed: number } | null>(null);

  console.log(stats)
  
  const fetchStats = () => {
    fetch('/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  };

  const startNewGame = () => {
    fetch('/new-game', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setWordLength(data.wordLength || 5);
        setMessage(data.message);
        setGuesses([]);
        setWord('');
        setAttemptsLeft(data.attemptsLeft); 
        fetchStats();
      });
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    if (word.length !== wordLength) {
      setMessage(`Enter ${wordLength} letters`);
      return;
    }

    fetch('/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setGuesses(prev => [...prev, { word, feedback: data.feedback }]);
          setAttemptsLeft(data.attemptsLeft);
          if (data.message) {
            setMessage(data.message);
          } else {
            setMessage(null);
          }
          setWord('');
          fetchStats();
        }
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Wordle Clone</h1>
      <p>{message}</p>

      <div style={{ display: 'grid', gridTemplateRows: `repeat(${guesses.length + attemptsLeft}, 1fr)`, gap: '4px' }}>
        {[...guesses, ...Array.from({ length: attemptsLeft }).map(() => null)].map((guess, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${wordLength}, 1fr)`,
              gap: '4px'
            }}
          >
            {Array.from({ length: wordLength }).map((_, colIndex) => {
              const letter = guess ? guess.word[colIndex] : '';
              const feedbackColor = guess
                ? guess.feedback[colIndex] === 'green'
                  ? 'green'
                  : guess.feedback[colIndex] === 'yellow'
                  ? 'gold'
                  : 'lightgray'
                : 'white';
              return (
                <div
                  key={colIndex}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: feedbackColor,
                    color: guess ? 'white' : 'black',
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={word}
        onChange={e => setWord(e.target.value.toUpperCase())}
        maxLength={wordLength}
        disabled={message?.includes('win') || message?.includes('lose')}
        style={{ textTransform: 'uppercase', fontSize: '1.2em', textAlign: 'center', marginTop: '10px' }}
      />
      <br />
      <button
        onClick={handleGuess}
        disabled={message?.includes('win') || message?.includes('lose')}
        style={{ marginTop: '10px' }}
      >
        Guess
      </button>
      <button onClick={startNewGame} style={{ marginTop: '10px', marginLeft: '5px' }}>
        New Game
      </button>

      <p>Attempts left: {attemptsLeft}</p>

      {stats && (
        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          <p>✅ Wins: {stats.wins}</p>
          <p>🔥 Streak: {stats.streak}</p>
          <p>🎯 Average Attempts: {stats.averageAttempts}</p>
          <p>🎮 Games Played: {stats.gamesPlayed}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
