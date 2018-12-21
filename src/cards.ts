const { shuffleArray } = require('./shuffle-array.js');

const suits : string[] = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const ranks : string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

export class Card {
  constructor(idx: number) {
    this.index = idx;
    this.suit = Math.floor(idx/13);
    this.rank = idx % 13;
    // this.name = `${ranks[this.rank].slice(0,2)} of ${suits[this.suit][0]}`;
    this.name = `${ranks[this.rank].slice(0,2)}-${suits[this.suit][0]}`;
  }
  index: number;
  suit: number;
  rank: number;
  name: string;

  getName(): string {
    return this.name;
  }
}

export class PlayerHand {
  constructor(playerName: string, cards: Card[]) {
    this.playerName = playerName;
    this.cards = cards;
  }

  playerName: string;
  cards: Card[];
}

export function dealCards() {
  const cards: Card[] = [...new Array(52)]
    .map((_, idx) => {
      return new Card(idx);
    });

    const shuffledCards: Card[] = shuffleArray(cards);
    // const shuffledCards = cards;

  return ['Player 1', 'Player 2', 'Player 3', 'Player 4']
    .map((playerName, idx) => {
      const start = idx * 13;
      const end = start + 13;

      const cards = shuffledCards.slice(start, end).sort((a, b) =>
        // sort by suit then by value desc
        b.suit - a.suit ||  b.index - a.index);
      const hand = new PlayerHand(playerName, cards);

      return hand;
    });
}
