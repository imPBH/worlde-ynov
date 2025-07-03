import { GameState } from "../game/GameState";

describe('GameState', () => {
  let game: GameState;

  beforeEach(() => {
    game = new GameState();
    game.startNewGame();
  });

  it('starts new game with 6 attempts', () => {
    expect(game.makeGuess('apple').attemptsLeft).toBeLessThan(6);
  });

  it('rejects invalid word', () => {
    expect(game.makeGuess('abc').error).toBe('Invalid word');
  });

  it('wins when correct', () => {
    expect(game.makeGuess('APPLE').message).toBe('You win!');
  });
});
