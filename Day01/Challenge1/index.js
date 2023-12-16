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

// TODO create function to find first and last digits of each string 

function findFirstDigit(string) {
    for (let i = 0; i < string.length; i++) {
        if (string[i] >= '0' && string[i] <= '9') {
            return string[i];
        }
    }
};

function findLastDigit(string) {
    for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] >= '0' && string[i] <= '9') {
            return string[i];
        }
    }
}

function findDigits(string) {
    return parseInt(findFirstDigit(string) + findLastDigit(string));
};

let digits = [];

for (let i = 0; i < data.length; i++) {
    digits.push(findDigits(data[i]));
}

// console.log(digits);

// TODO create function to add all of the digits and find the solution

function addDigits(digits) {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        sum += digits[i];
    }
    return sum;
}

const sum = addDigits(digits);

console.log(sum);
