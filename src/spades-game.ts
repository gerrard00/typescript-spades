import { Card, dealCards } from './cards';

const playerHands = dealCards();

console.log('\n');
playerHands.forEach((playerHand) => {
  console.log(`${playerHand.playerName}\n`);
  playerHand.cards.forEach(card => process.stdout.write(`${card.getName()}\t`));
  console.log('\n\n');
});
console.log('\n');
