const faker = require('faker');
const fs = require('fs');
const chalk = require('chalk');

const log = console.log;
let data = {}
data.phoneNumbers = []
let largest;
let smallest;
let randomNumber = faker.random.number({ 'min': 1, 'max': 9999})

const generateNumbers = () => {
  for (let i=0; i<randomNumber; i++){
  let obj = {
      id: i,
      number: faker.phone.phoneNumber('0###-######')
  }
  data.phoneNumbers.push(obj)
}
  return data.phoneNumbers;
}

const sortSmallest = (phoneNumbers) => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  phoneNumbers.sort(function(a, b) { return collator.compare(a.number, b.number) });
  fs.writeFile ("phoneNumbers-asc.json", JSON.stringify(phoneNumbers, null, 2), () => {})
  smallest = JSON.stringify(phoneNumbers[0]);
  log(chalk.whiteBright('\n' + 'Smallest Phone-Number: ') + chalk.red(smallest))
}

const sortLargest = (phoneNumbers) => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  phoneNumbers.sort(function(a, b) { return collator.compare(b.number, a.number) });
  fs.writeFile ("phoneNumbers-desc.json", JSON.stringify(phoneNumbers, null, 2), () => {})
  largest = JSON.stringify(phoneNumbers[0]);
  log(chalk.whiteBright('\n' + 'Largest Phone-Number: ') + chalk.red(largest))
}

const writeToFile = (data) => {
  fs.writeFile ("phoneNumbers.json", JSON.stringify(data, null, 2), function(err) {
  log(chalk.blue('==========================================='))
  log(chalk.green('          Generation Complete          '))
  log(chalk.blue('==========================================='))
  log(chalk.whiteBright('\n' + 'Generated ') + chalk.red(randomNumber) + chalk.whiteBright(' Phone-Numbers'))
  sortSmallest(data)
  sortLargest(data)
  }
  )
}



function PhoneGenerator() {
  const data = generateNumbers();

  return (
    writeToFile(data)
  );
};

module.exports = PhoneGenerator;
PhoneGenerator()
