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

// TODO find the length of each string in the array of data 
const length = data[0].length; // 140

// TODO convert data into a two dimensional array

const dataArray = []

for (datum of data) {
    dataArray.push([...datum]);
}

// TODO create a function to find all of the numbers

const gearList = {};

function findNumbers (array) {
    for(let i = 0; i < length; i++) { 
        for(let j = 0; j < length; j++) {
            if (!isNaN(parseInt(array[i][j]))) {
                let number = '';
                const gears = new Set();
                findGears(i, j).forEach(g => gears.add(g));
                number += array[i][j];

                while (!isNaN(parseInt(array[i][j + 1]))) {
                    number += array[i][j + 1];
                    findGears(i, j + 1).forEach(g => gears.add(g));
                    j++;
                }

                gears.forEach(gear => {
                    if (!gearList[gear]) {
                        gearList[gear] = [parseInt(number)];
                    } else {
                        gearList[gear].push(parseInt(number));
                    }
                })
            }
        }
    }
};

// TODO create a function to test if the numberss are adjacent to any *s. 

function findGears (i, j) {
    const gears = [];
    for(let a = i - 1; a <= i + 1; a++) {
        for(let b = j - 1; b <= j + 1; b++) {
            if (dataArray[a] !== undefined && dataArray[a][b] === '*'){
                gears.push(`${a}-${b}`);
            }
        }
    }
    return gears;
};

findNumbers(dataArray);

// filter out any *s that are not gears and sum the product

let sum = 0;

for (const key in gearList) {
    const gear = gearList[key];
    if (gear.length === 2) {
        sum += gear[0] * gear[1];
    }
}

console.log(sum);