const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
  if (err) {
    console.log(err);
  }
});

const messyData = input.split('\n\n');

const expectedFields = [
  { byr: true },
  { iyr: true },
  { eyr: true },
  { hgt: true },
  { hcl: true },
  { ecl: true },
  { pid: true },
  // { cid: false },
];

const massageData = (messyData) => {
  let travelDocuments = [];

  const splitStr = (x) => {
    const y = x.split(':');
    return { [y[0].trim()]: y[1].trim() };
  };
  messyData.map((credential) => {
    const document = credential.split(/\n| /);
    let allFields = [];
    document.map((field) => {
      allFields.push(splitStr(field));
    });
    travelDocuments.push(allFields);
  });
  return travelDocuments;
};

const validateCredentials = (allTravelDocs) => {
  let validDocuments = [];
  allTravelDocs.map((document) => {
    let count = 0;
    document.map((field) => {
      expectedFields.map((expectedField) => {
        if (Object.keys(expectedField) in field) {
          count = count + 1;
        }
        if (count === 7) {
          validDocuments.push(document);
          count = 0;
        }
      });
    });
  });
  return validDocuments;
};

solve1 = () => {
  let allDocuments = massageData(messyData);
  const validDocuments = validateCredentials(allDocuments);
  console.log(validDocuments.length, 'passports are valid.');
};

solve1();
