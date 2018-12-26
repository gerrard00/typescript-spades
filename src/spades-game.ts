import { Card, PlayerHand, dealCards } from './cards';

export class SpadesGame {
constructor() {
  this.playerHands = dealCards();

  console.log('\n');
  this.playerHands.forEach((playerHand) => {
    console.log(`${playerHand.playerName}\n`);
    playerHand.cards.forEach(card => process.stdout.write(`${card.getName()}\t`));
    console.log('\n\n');
  });
  console.log('\n');
}

playerHands: PlayerHand[];
 }

