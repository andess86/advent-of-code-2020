const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
  if (err) {
    console.log(err);
  }
});

let map = input.split('\n');
let bottomOfMap = map.length;
let rightSideOfMap = map[0].length;

const makeDataTable = (data) => {
  let arr = [];
  data.map((datum, i) => {
    arr.push(datum.split(''));
  });
  return arr;
};

const moveToboggan = (currentLocation) => {
  currentLocation.lat = currentLocation.lat + 3;
  currentLocation.long = currentLocation.long + 1;
  if (currentLocation.lat >= rightSideOfMap) {
    switch (currentLocation.lat) {
      case rightSideOfMap:
        currentLocation.lat = 0;
        break;
      case rightSideOfMap + 1:
        currentLocation.lat = 1;
        break;
      case rightSideOfMap + 2:
        currentLocation.lat = 2;
        break;
      default:
        break;
    }
  }
  return currentLocation;
};

const traverseWorld = (datatable) => {
  let characters = [];
  let currentLocation = {
    lat: 0,
    long: 0,
  };
  while (currentLocation.long <= bottomOfMap) {
    currentLocation = moveToboggan(currentLocation);
    if (currentLocation.long < bottomOfMap) {
      characters.push(datatable[currentLocation.long][currentLocation.lat]);
    }
  }
  return characters;
};

const solve1 = () => {
  const dataTable = makeDataTable(map);
  const terrainTypes = traverseWorld(dataTable);
  var numberOfTrees = terrainTypes.filter((item) => item === '#').length;
  console.log(numberOfTrees + ' trees were encountered');
};

solve1();