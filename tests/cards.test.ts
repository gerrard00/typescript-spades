import { Card, PlayerHand, dealCards } from '../src/cards';

test('basic', () => {

  const playerHands = dealCards();
  expect(playerHands).toHaveLength(4);

  const allCards: Card[] =
    playerHands.reduce((acc: Card[], hand: PlayerHand) => {
      return [...acc, ...(hand.cards)];
    }, []);

  expect(allCards).toHaveLength(52);
  const cardExpectations = new Array(52).fill(0)
    .map((_, index) => expect.objectContaining({
      index
    }));

  expect(allCards).toEqual(expect.arrayContaining(cardExpectations));

});
