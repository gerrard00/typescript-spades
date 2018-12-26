import { SpadesGame, RoundState } from '../src/spades-game';

// TODO: should be mocking the deal to hardcode a sequence for testing
test('basic', () => {
  const game = new SpadesGame();
  let currentRound = game.startGame();

  expect(game.playerHands.length).toBe(4);

  const firstPlayerCard = game.playerHands[0].cards[7];
  console.log(`First player will play ${firstPlayerCard.getName()}`);

  currentRound = game.playCard(0, firstPlayerCard);

  for (let i = 1; i < 4; i++) {
    const currentPlayerCard =
      game.playerHands[i].cards.find(c => c.suit === currentRound.suit)
        || game.playerHands[i].cards[0];

    console.log(`${['Second', 'Third', 'Fourth'][i - 1]}  player will play ${currentPlayerCard.getName()}`);
    currentRound = game.playCard(i, currentPlayerCard!);
  }

  expect(currentRound.state).toBe(RoundState.Completed);
  console.log(`The winner was ${['First', 'Second', 'Third', 'Fourth'][currentRound.winner!]} player with ${currentRound.currentMaxCard!.getName()}`);
});
