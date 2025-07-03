import { WordValidator } from "../game/WordValidator";

describe('WordValidator', () => {
  it('accepts valid 5-letter word', () => {
    expect(WordValidator.validate('apple')).toBe(true);
  });

  it('rejects too short word', () => {
    expect(WordValidator.validate('cat')).toBe(false);
  });

  it('rejects non-alphabetic', () => {
    expect(WordValidator.validate('appl3')).toBe(false);
  });
});
