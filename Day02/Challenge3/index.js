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

console.log(games[0].sets);

// TODO identify the games where there are more than 12 red balls, 13 green balls, or 14 blues balls
function possibleGame(game) {
    for (set of game.sets) {
        if (set.red > 12 || set.green > 13 || set.blue > 14) {
            return false;
        }
    }
    return true;
};

const possibleGames = games.filter(possibleGame);

// TODO sum all possible games
function addGames (games) {
    let sum = 0;
    for (game of games) {
        sum += game.id;
    }
    return sum;
};

sum = addGames(possibleGames);
console.log(sum);