import { WordValidator } from './WordValidator';
import { GameLogic } from './GameLogic';

export class GameState {
  private targetWord: string = '';
  private attemptsLeft = 6;
  private gameOver = false;

  startNewGame() {
    this.targetWord = 'APPLE'; // TODO: tirer un mot du dictionnaire
    this.attemptsLeft = 6;
    this.gameOver = false;
  }

  makeGuess(word: string) {
    if (this.gameOver) return { error: 'Game over' };
    if (!WordValidator.validate(word)) return { error: 'Invalid word' };

    const feedback = GameLogic.checkGuess(word.toUpperCase(), this.targetWord);
    this.attemptsLeft--;

    if (feedback.every(f => f === 'green')) {
      this.gameOver = true;
      return { feedback, message: 'You win!' };
    }

    if (this.attemptsLeft <= 0) {
      this.gameOver = true;
      return { feedback, message: `You lose! The word was ${this.targetWord}` };
    }

    return { feedback, attemptsLeft: this.attemptsLeft };
  }
}
