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


// TODO find the positions of each piece of valid data in the array

function findNumbers (array) {
    const numbers = [];
    for(let i = 0; i < length; i++) { 
        for(let j = 0; j < length; j++) {
            if (!isNaN(parseInt(array[i][j]))) {
                let number = '';
                let isAdjacentToSymbol = checkAdjacenctCells(i, j);
                number += array[i][j];

                while (!isNaN(parseInt(array[i][j + 1]))) {
                    number += array[i][j + 1];
                    if (!isAdjacentToSymbol){
                        isAdjacentToSymbol = checkAdjacenctCells(i, j+1);
                    }
                    j++;
                }

                if (isAdjacentToSymbol) {
                    numbers.push(parseInt(number));
                }
            }
        }
    }
    // console.log(numbers);
    return numbers;
};

function checkAdjacenctCells(i, j) {
    for(let a = i-1; a <= i + 1; a++) {
        for(let b = j-1; b <= j + 1; b++) {
            try {
                if (dataArray[a][b] !== undefined && isNaN(parseInt(dataArray[a][b])) && dataArray[a][b] !== '.') {
                    return true;
                }
            } catch (err) {
            }
        }
    }
    return false;
};

const numbers = findNumbers(dataArray);

console.log("count", numbers.length)

function addNumbers(numbers) {
    let sum = 0;
    for(let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
};

const solution = addNumbers(numbers);

console.log(solution);

