import { Card, PlayerHand, dealCards } from './cards';

export class SpadesGame {
  constructor() {
    this.playerHands = dealCards();
    this.currentRound = 0;
  }

  showHands(): void {
    this.playerHands.forEach((playerHand) => {
      console.log(`${playerHand.playerName}\n`);
      playerHand.cards.forEach(card => process.stdout.write(`${card.getName()}\t`));
      console.log('\n\n');
    });
  }

  playerHands: PlayerHand[];
  currentRound: number;
 }

