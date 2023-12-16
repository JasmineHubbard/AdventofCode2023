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


// TODO find game ids
function getGameId(string) {
    const splitString = string.split(':');
    const gameId = splitString[0].substring(5);
    return parseInt(gameId);
};

getGameId(data[14]);

// TODO split into sets
function getSets(string) {
    const splitSet = string.split(':');
    const gameSets = splitSet[1];
    const splitString = gameSets.split(';');
    
    // TODO parse set
    return splitString.map(parseSet);
};

// TODO parse the sets
function parseSet(string) {
    const parsedSet = string.split(',');
    
    const set = {};
    for (item of parsedSet) {
        const setItem = item.split(' ');
        set[setItem[2]] = parseInt(setItem[1]);
    }
    return set;
};

// TODO create a new array of game data
const games = [];

for (datum of data) {
    const game = {
        id: getGameId(datum),
        sets: getSets(datum),
    };
    games.push(game);
}

// TODO create function to determine fewest number of cubes of each colour to make each game possible
function fewestCubes (game) {
    
    // find maximum number of each coloured cube
    highestRed = Math.max(...game.sets.map(set => set.red ?? 0));
    highestGreen = Math.max(...game.sets.map(set => set.green ?? 0));
    highestBlue = Math.max(...game.sets.map(set => set.blue ?? 0));
    
    const power = highestRed * highestGreen * highestBlue;
    return power;
};

// TODO find sum of power of minimum cubes for all games
let sum = 0;

for (game of games) {
    power = fewestCubes(game);
    sum += power;
}

console.log(sum);