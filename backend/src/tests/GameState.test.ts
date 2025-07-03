import { GameState } from "../game/GameState";

describe('GameState', () => {
  let game: GameState;

  beforeEach(() => {
    game = new GameState('APPLE');
  });

  it('wins when guess is correct', () => {
    const result = game.makeGuess('APPLE');
    expect(result.message).toBe('You win!');
    expect(game.getWins()).toBe(1);
  });

  it('loses after 6 incorrect guesses', () => {
    for (let i = 0; i < 6; i++) {
      game.makeGuess('HOUSE');
    }
    expect(game.isGameOver()).toBe(true);
    expect(game.getStreak()).toBe(0);
  });

  it('rejects invalid word', () => {
    const result = game.makeGuess('12345');
    expect(result.error).toBe('Invalid word');
  });

  it('blocks guess after game over', () => {
    for (let i = 0; i < 6; i++) game.makeGuess('HOUSE');
    const result = game.makeGuess('APPLE');
    expect(result.error).toBe('Game over');
  });

  it('returns game over error if trying to guess after win', () => {
    game.makeGuess('APPLE');
    const result = game.makeGuess('HOUSE');
    expect(result.error).toBe('Game over');
  });

  it('returns average attempts 0 if no game played', () => {
    const g = new GameState('APPLE');
    expect(g.getAverageAttempts()).toBe(0);
  });

  it('getWordLength returns correct length', () => {
    expect(game.getWordLength()).toBe(5);
  });

  it('returns feedback and attemptsLeft when guess is incorrect and game continues', () => {
    const result = game.makeGuess('HOUSE');
    expect(result.feedback).toBeDefined();
    expect(result.attemptsLeft).toBe(5);
  });

  it('returns lose message when attempts run out', () => {
    let result;
    for (let i = 0; i < 6; i++) {
      result = game.makeGuess('HOUSE');
    }
    expect(result?.message).toContain('You lose');
  });

  it('wins on last attempt', () => {
    for (let i = 0; i < 5; i++) {
      game.makeGuess('HOUSE');
    }
    const result = game.makeGuess('APPLE');
    expect(result.message).toBe('You win!');
  });
});
