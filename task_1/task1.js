const readline = require('readline');
import {createInterface} from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const reversed = (sentence) => {
    return sentence.split('').reverse().join('');
};

const question = () => {
    console.log('Please write a sentence!');
    rl.on('line', (input) => {
        console.log(reversed(`${input}`));
      });
};

question();
