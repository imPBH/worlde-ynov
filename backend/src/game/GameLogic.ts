export type Feedback = ('green' | 'yellow' | 'gray')[];

export class GameLogic {
  static checkGuess(guess: string, target: string): Feedback {
    const feedback: Feedback = Array(5).fill('gray');
    const targetLetters = target.split('');
    const guessLetters = guess.split('');

    // Pass 1: green
    guessLetters.forEach((char, idx) => {
      if (char === targetLetters[idx]) {
        feedback[idx] = 'green';
        targetLetters[idx] = '_';
      }
    });

    // Pass 2: yellow
    guessLetters.forEach((char, idx) => {
      if (feedback[idx] !== 'green' && targetLetters.includes(char)) {
        feedback[idx] = 'yellow';
        targetLetters[targetLetters.indexOf(char)] = '_';
      }
    });

    return feedback;
  }
}
