import express from 'express';
import { GameState } from './game/GameState';

const app = express();
app.use(express.json());

const game = new GameState();

app.post('/new-game', (req, res) => {
  game.startNewGame();
  console.log(`Target word is: ${game.getTargetWord()}`)
  res.json({
    message: 'New game started',
    wordLength: game.getWordLength(),
    attemptsLeft: game.getAttemptsLeft(),
    targetWord: process.env.NODE_ENV === 'test' ? game.getTargetWord() : undefined
  });
});

app.post('/guess', (req, res) => {
  const { word } = req.body;
  const result = game.makeGuess(word);
  res.json(result);
});

export default app;
