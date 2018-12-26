import { SpadesGame } from '../src/spades-game';

test('basic', () => {
  const game = new SpadesGame();

  expect(game.playerHands.length).toBe(4);
});
