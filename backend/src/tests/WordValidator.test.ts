import { WordValidator } from "../game/WordValidator";

describe('WordValidator', () => {
  it('accepts valid 5-letter word in dictionary', () => {
    expect(WordValidator.validate('APPLE', 5)).toBe(true);
  });

  it('rejects word not in dictionary', () => {
    expect(WordValidator.validate('QWERT', 5)).toBe(false);
  });

  it('rejects word with wrong length', () => {
    expect(WordValidator.validate('APP', 5)).toBe(false);
  });

  it('rejects word with non-alpha chars', () => {
    expect(WordValidator.validate('APPL3', 5)).toBe(false);
  });

  it('getRandomWord returns a word of correct length', () => {
    const word = WordValidator.getRandomWord(5);
    expect(word.length).toBe(5);
  });

  it('getRandomWord throws if no word of length', () => {
    expect(() => WordValidator.getRandomWord(99)).toThrow();
  });
});
