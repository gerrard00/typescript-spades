import { Card, PlayerHand, dealCards } from './cards';

export enum RoundState {
  NotStarted = 0,
  InProgress,
  Completed,
};

export class Round {
  // TODO: suite should really be an enum
  constructor(roundNumber: number, startingPlayerIndex: number) {
    this.roundNumber = roundNumber;
    this.playCount = 0;
    this.currentPlayerIndex = startingPlayerIndex;
    this.suit = -1;
    this.roundComplete = false;
    this.currentMaxCard = null;
    this.winner = null;
    this.state = RoundState.NotStarted;
  }
  roundNumber: number;
  playCount: number;
  currentPlayerIndex: number;
  suit: number;
  roundComplete: boolean;
  currentMaxCard: Card | null;
  winner: number | null;
  state: RoundState;
};

export class SpadesGame {
  constructor() {
    this.rounds = [];
    this.playerHands = [];
  }

  startGame(): Round {
    this.playerHands = dealCards();
    const firstRound = new Round(0, 0);
    this.rounds.push(firstRound);

    return firstRound;
  }

  playCard(playerHandIndex: number, c: Card) {
    const currentRound = this.rounds[this.rounds.length - 1];
    // TODO: remove the card from the player's hand...return it?

    const updatedRoundObject = {
      ...currentRound, ...{
      playCount: currentRound.playCount + 1,
      state: (currentRound.playCount < 2)
        ? RoundState.InProgress
        : RoundState.Completed,
    }};
    this.rounds[this.rounds.length - 1] = updatedRoundObject;

    if (currentRound.playCount === 0) {
      updatedRoundObject.suit = c.suit;
      updatedRoundObject.currentMaxCard = c;
      updatedRoundObject.winner = playerHandIndex;
      // console.log(JSON.stringify(updatedRoundObject, null, 2));
      return updatedRoundObject;
    }

    const maxCard = currentRound.currentMaxCard!;

    if (updatedRoundObject.playCount === 3) {
      updatedRoundObject.state = RoundState.Completed;
    }

    if (c.suit === maxCard.suit && c.rank > maxCard.rank) {
      console.log(`${c.getName()} beats ${maxCard.getName()}`);
      updatedRoundObject.currentMaxCard = c;
      updatedRoundObject.winner = playerHandIndex;
      // console.log(JSON.stringify(updatedRoundObject, null, 2));
      return updatedRoundObject;
    }

    // TODO: magic number
    // spades beats non-spades
    if (maxCard.suit !== 3 && c.suit === 3) {
      console.log(`Spade ${c.getName()} beats non-spade ${maxCard.getName()}`);
      updatedRoundObject.currentMaxCard = c;
      updatedRoundObject.winner = playerHandIndex;
      // console.log(JSON.stringify(updatedRoundObject, null, 2));
      return updatedRoundObject;
    }

    // TODO: was it the last play of this round?
    // TODO: debug
    // console.log(JSON.stringify(updatedRoundObject, null, 2));
    return updatedRoundObject;
  }

  showHands(): void {
    this.playerHands.forEach((playerHand) => {
      console.log(`${playerHand.playerName}\n`);
      playerHand.cards.forEach(card => process.stdout.write(`${card.getName()}\t`));
      console.log('\n\n');
    });
  }

  playerHands: PlayerHand[];
  rounds: Round[];
 }

