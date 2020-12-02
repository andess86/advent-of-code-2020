
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
  if (err) {
    console.log(err);
  }
});

let passwords = input.split('\n');

// Fix data so we can more easily work with it
const massageData = (passwords) =>
  passwords.map((password) => {
    let temp = password.split(' ');
    let intervall = temp[0];
    let numbers = intervall
      .split('-')
      .map((numerical) => parseInt(numerical, 10));
    let data = [];
    data.push(numbers[0], numbers[1], temp[1][0], temp[2]);
    return data;
  });

const isPasswordsValid = (passwords) => {
  let numberOfValidPasswords = 0;
  passwords.map((password) => {
    //  match function doesn't accept string literals as regex patterns,
    // need the constructor of the RegExp object and pass that to the String.match function:
    var regEx = new RegExp(password[2], 'g');
    var count = (password[3].match(regEx) || []).length;
    if (count >= password[0] && count <= password[1]) {
      numberOfValidPasswords++;
    }
  });
return numberOfValidPasswords;
};

const solve1 = () => {
  const data = massageData(passwords);
  let correctPasswords = isPasswordsValid(data);
  console.log(correctPasswords + ' passwords are valid.');
};

solve1();
