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

// TODO find number of matches for each card
function findMatches(card) {
    let matches = 0;
    for (i = 0; i < card.winningNumbers.length; i++) {
        if (card.scratchedNumbers.includes(card.winningNumbers[i])) {
            matches += 1;
        }
    }
    return matches;
}

// TODO store the number of copies of each card
let copies = [];

for(let i = 0; i < cards.length; i++) {
    if (!copies[i]) copies[i] = 1;

    const matches = findMatches(cards[i]);

    for(let j = 1; j <= matches; j++) {
        if (i + j > cards.length - 1) return;
        copies[i + j] = (copies[i + j] ?? 1) + copies[i];
    }
}

// TODO calculate the total of each card
let total = 0;
for(let i = 0; i < copies.length; i++) {
    total += copies[i];
}

console.log(total);