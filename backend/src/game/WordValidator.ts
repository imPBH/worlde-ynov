const DICTIONARY = [
  'APPLE', 'HOUSE', 'PLANE', 'BRICK', 'CRANE', 'FLOOR', 'LIGHT',
  'NIGHT', 'CHAIR', 'TABLE', 'MOUSE', 'SNAKE', 'ROBOT'
];

export class WordValidator {
  static validate(word: string, wordLength: number): boolean {
    return new RegExp(`^[a-zA-Z]{${wordLength}}$`).test(word) &&
           DICTIONARY.includes(word.toUpperCase());
  }

  static getRandomWord(wordLength: number): string {
    const candidates = DICTIONARY.filter(w => w.length === wordLength);
    if (candidates.length === 0) throw new Error(`No word found with length ${wordLength}`);
    const index = Math.floor(Math.random() * candidates.length);
    return candidates[index];
  }
}