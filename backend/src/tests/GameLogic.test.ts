import { GameLogic } from "../game/GameLogic";

describe('GameLogic', () => {
  it('all green if exact match', () => {
    expect(GameLogic.checkGuess('APPLE', 'APPLE')).toEqual(['green','green','green','green','green']);
  });

  it('handles yellow and gray', () => {
    expect(GameLogic.checkGuess('PLAZA', 'APPLE')).toEqual(['yellow','yellow','gray','gray','gray']);
  });
});
