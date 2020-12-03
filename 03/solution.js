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

const moveToboggan = (currentLocation, slope) => {
  currentLocation.lat = currentLocation.lat + slope.dx;
  currentLocation.long = currentLocation.long + slope.dy;
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
      case rightSideOfMap + 3:
        currentLocation.lat = 3;
        break;
      case rightSideOfMap + 4:
        currentLocation.lat = 4;
        break;
      case rightSideOfMap + 5:
        currentLocation.lat = 5;
        break;
      case rightSideOfMap + 6:
        currentLocation.lat = 6;
        break;

      default:
        break;
    }
  }
  return currentLocation;
};

const traverseWorld = (worldMap, slope = { dx: 3, dy: 1 }) => {
  let characters = [];
  let currentLocation = {
    lat: 0,
    long: 0,
  };
  while (currentLocation.long <= bottomOfMap) {
    currentLocation = moveToboggan(currentLocation, slope);
    if (currentLocation.long < bottomOfMap) {
      characters.push(worldMap[currentLocation.long][currentLocation.lat]);
    }
  }
  return characters;
};

const solve1 = () => {
  const worldMap = makeDataTable(map);
  const terrainTypes = traverseWorld(worldMap);
  var numberOfTrees = terrainTypes.filter((item) => item === '#').length;
  console.log(numberOfTrees + ' trees were encountered');
};

solve2 = () => {
  const worldMap = makeDataTable(map);
  const slopes = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ];
  const treesPerSlope = [];

  slopes.map((slope) => {
    const terrainTypes = traverseWorld(worldMap, slope);
    var numberOfTrees = terrainTypes.filter((item) => item === '#').length;
    treesPerSlope.push(numberOfTrees);
  });
  const totalTrees = treesPerSlope.reduce((product, trees) => product * trees, 1);
  console.log(totalTrees + ' is the number if multiplying trees from all slopes.');
};

solve1();
solve2();
