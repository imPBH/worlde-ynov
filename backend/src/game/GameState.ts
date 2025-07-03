import { WordValidator } from "./WordValidator";
import { GameLogic, Feedback } from "./GameLogic";

export interface GuessResult {
  feedback?: Feedback;
  message?: string;
  error?: string;
  attemptsLeft?: number;
}

export class GameState {
  private targetWord: string = '';
  private attemptsLeft = 6;
  private gameOver = false;
  private wins = 0;
  private streak = 0;
  private totalAttempts = 0;
  private gamesPlayed = 0;
  private wordLength = 5;

  constructor(targetWord?: string, wordLength = 5) {
    this.startNewGame(targetWord, wordLength);
  }

  startNewGame(targetWord?: string, wordLength = 5) {
    this.wordLength = wordLength;
    if (targetWord) {
      this.targetWord = targetWord.toUpperCase();
    } else {
      this.targetWord = WordValidator.getRandomWord(this.wordLength);
    }
    this.attemptsLeft = 6;
    this.gameOver = false;
  }

  makeGuess(word: string): GuessResult {
    if (this.gameOver) return { error: 'Game over' };
    if (!WordValidator.validate(word, this.wordLength)) return { error: 'Invalid word' };

    const feedback = GameLogic.checkGuess(word.toUpperCase(), this.targetWord);
    this.attemptsLeft--;

    if (feedback.every(f => f === 'green')) {
      this.gameOver = true;
      this.wins++;
      this.streak++;
      this.totalAttempts += (6 - this.attemptsLeft);
      this.gamesPlayed++;
      return { feedback, message: 'You win!' };
    }

    if (this.attemptsLeft <= 0) {
      this.gameOver = true;
      this.streak = 0;
      this.gamesPlayed++;
      this.totalAttempts += (6 - this.attemptsLeft);
      return { feedback, message: `You lose! The word was ${this.targetWord}` };
    }

    return { feedback, attemptsLeft: this.attemptsLeft };
  }

  getAttemptsLeft() {
    return this.attemptsLeft;
  }

  isGameOver() {
    return this.gameOver;
  }

  getTargetWord() {
    return this.targetWord;
  }

  getWins() {
    return this.wins;
  }

  getStreak() {
    return this.streak;
  }
  
  getAverageAttempts() {
    return this.gamesPlayed ? this.totalAttempts / this.gamesPlayed : 0;
  }

  getWordLength() {
    return this.wordLength;
  }
}
