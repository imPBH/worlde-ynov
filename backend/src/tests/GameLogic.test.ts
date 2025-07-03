import { GameLogic } from "../game/GameLogic";

describe('GameLogic', () => {
  it('all green on exact match', () => {
    expect(GameLogic.checkGuess('APPLE', 'APPLE')).toEqual(['green','green','green','green','green']);
  });

  it('handles mix of green, yellow, gray', () => {
    expect(GameLogic.checkGuess('PLAZA', 'APPLE')).toEqual(['yellow','yellow','yellow','gray','gray']);
  });

  it('handles duplicate letters in guess when target has one', () => {
    expect(GameLogic.checkGuess('ARRAY', 'CRANE')).toEqual([
      'yellow',
      'green',
      'gray',
      'gray',
      'gray'
    ]);
  });
});
