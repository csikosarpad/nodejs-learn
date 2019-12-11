const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const reversed = (sentence) => {
    return sentence.split('').reverse().join('');
};

const question = () => {
    console.log('Please write a short sentence here: ');
    rl.on('line', (input) => {
        console.log(reversed(`${input}`));
      });
};

question();
