#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const input = readline.createInterface(process.stdin, process.stdout);

let result = null;
let saveFileName = '';


const checkFile = (data) => {
  saveFileName = path.join(__dirname, `${data}.json`);
  try {
    if (fs.existsSync(saveFileName)) {
      console.log('Отлично, файл уже существует');
      result = JSON.parse(fs.readFileSync(saveFileName));
    } else {
      console.log('Файл не найден, выходим из приложения');
      process.exit();
    }
  } catch(err) {
    console.error(err)
  }
};

console.log('Введите имя файла');

input.on('line', (data) => {
  checkFile(data);

  const amount = result.reduce((acc, i) => {
    return acc += i.length
  } , 0)

  const amountWin = result.reduce((acc, i) => {
     i.forEach(item => {
      item.win && acc++
    })
    return acc
  }, 0)

  const amountLose = amount - amountWin;
  const winRate = Math.floor((amountWin * 100) / amount);

  console.log(`Совершено бросков: ${amount}`);
  console.log(`Угадано бросков: ${amountWin}`);
  console.log(`Не угадано бросков: ${amountLose}`);
  console.log(`Процент угаданных бросков: ${winRate}%`);

  process.exit();
});
