const fs = require('node:fs');

let data;

try {
  data = fs.readFileSync(__dirname + '/../input.txt', 'utf8');
  // console.log(data);
} catch (err) {
  console.error(err);
  throw err;
}

// TODO format into array of strings
data = data.split('\r\n');

// TODO format data into an array of objects (each object with two arrays)

const cards = [];

for (let i = 0; i < data.length; i++) {
    const splitString = data[i].split(':');
    const splitNumbers = splitString[1].split('|');
    cards.push({
        id: splitString[0],
        winningNumbers: splitNumbers[0].split(" ").filter(x => x !== '').map(x => parseInt(x)),
        scratchedNumbers: splitNumbers[1].split(" ").filter(x => x !== '').map(x => parseInt(x)),
    })
}

// TODO write function to compare scratched numbers to winning numbers

function compareNumbers(card) {
    let points = 0;
    for (i = 0; i < card.winningNumbers.length; i++) {
        if (card.scratchedNumbers.includes(card.winningNumbers[i]) && points === 0) {
            points += 1;
        } else if (card.scratchedNumbers.includes(card.winningNumbers[i])) {
            points *= 2;
        }
    }
    return points;
}

// TODO check each card in cards by calling compareNumbers function inside a loop

let total = 0;

for (let i = 0; i < cards.length; i++) {
    total += compareNumbers(cards[i]);
}

console.log(total);

