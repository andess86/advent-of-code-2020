const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
  if (err) {
    console.log(err);
  }
});
const entries = input.split('\n');
const arrOfInts = entries.map(Number);

arrOfInts.map((entry, i) => {
  arrOfInts.forEach((el) => {
    if (entry + el === 2020) {
      console.log(
        `Got it. The correct answer when multiplying ` +
          entry +
          ` and ` +
          el +
          ` is ` +
          entry * el
      );
    }
    arrOfInts.forEach((third) => {
      if (entry + el + third === 2020) {
        console.log(
          `Got it. The correct answer when multiplying ` +
            entry +
            ` , ` +
            el +
            ` and ` +
            third +
            ` is ` +
            entry * el * third
        );
      }
    });
  });
});
