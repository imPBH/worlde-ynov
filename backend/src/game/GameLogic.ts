export type Feedback = ('green' | 'yellow' | 'gray')[];

export class GameLogic {
  static checkGuess(guess: string, target: string): Feedback {
    const feedback: Feedback = Array(5).fill('gray');
    const targetLetters = target.split('');

    // Pass 1: green
    guess.split('').forEach((char, i) => {
      if (char === targetLetters[i]) {
        feedback[i] = 'green';
        targetLetters[i] = '_'; // Marque comme utilisé
      }
    });

    // Pass 2: yellow
    guess.split('').forEach((char, i) => {
      if (feedback[i] === 'gray') {
        const idx = targetLetters.indexOf(char);
        if (idx !== -1) {
          feedback[i] = 'yellow';
          targetLetters[idx] = '_'; // Marque comme utilisé
        }
      }
    });

    return feedback;
  }
}
