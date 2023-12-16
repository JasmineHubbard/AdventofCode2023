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

// TODO convert written numbers into digits 

function findReplace (string) {
    string = string.replace('one', '1');
    string = string.replace('two', '2');
    string = string.replace('three', '3');
    string = string.replace('four', '4');
    string = string.replace('five', '5');
    string = string.replace('six', '6');
    string = string.replace('seven', '7');
    string = string.replace('eight', '8');
    string = string.replace('nine', '9');
    return string;
};

// TODO find first and last digits

function findLastDigit(string) {
    for (let i = string.length - 1; i >= 0; i--) {
        const parsedString = findReplace(string.substring(i))
        
        if (parsedString[0] >= '0' && parsedString[0] <= '9') {
            return parsedString[0];
        }
    }
};

function findFirstDigit(string) {
    for (let i = 1; i <= string.length; i++) {
        const parsedString = findReplace(string.substring(0, i))

        for (let i = 0; i < parsedString.length; i++) {
            if (parsedString[i] >= '0' && parsedString[i] <= '9') {
                return parsedString[i];
            }
        }
    }
};

// TODO create function to add all of the digits and find the solution

function findDigits(string) {
    // temp debug code
    if (isNaN(parseInt(findFirstDigit(string) + findLastDigit(string)))) {
        console.log('bad data: ' + string);
    }

    return parseInt(findFirstDigit(string) + findLastDigit(string));
};

let digits = [];

for (let i = 0; i < data.length; i++) {
    digits.push(findDigits(data[i]))
}

console.log(digits);

function addDigits(digits) {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        sum += digits[i];
    }
    return sum;
}

const sum = addDigits(digits);

console.log(sum);


    