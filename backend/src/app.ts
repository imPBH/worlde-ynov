import express from 'express';
import { GameState } from './game/GameState';

const app = express();
app.use(express.json());

const game = new GameState();

app.post('/new-game', (req, res) => {
  game.startNewGame();
  res.json({ message: 'New game started' });
});

app.post('/guess', (req, res) => {
  const { word } = req.body;
  const result = game.makeGuess(word);
  res.json(result);
});

export default app;
