#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

let isStartGame = true;
let saveFileName = '';
let saveLog = [];
let gameSessoin = [];

const input = readline.createInterface(process.stdin, process.stdout);

const throwCoin = () => {
  return Math.floor(Math.random() * 2 + 1);
};

const crateSaveFile = (data) => {
  saveFileName = path.join(__dirname, `${data}.json`);
  try {
    if (fs.existsSync(saveFileName)) {
      console.log('Отлично, файл уже существует');
      saveLog = JSON.parse(fs.readFileSync(saveFileName));
    } else {
      console.log('Отлично, имя файла свободно');
    }
  } catch(err) {
    console.error(err)
  }
};

const saveGame = () => {
  saveLog.push(gameSessoin);
  fs.writeFile(saveFileName, JSON.stringify(saveLog), (error) => {
    if (error) throw new Error(error);
  });
};

console.log('Привет. Перед вами игра "Орел или Решка"');
console.log('Введи имя файда для сохранения прогресса игры');

input.on('line', (data) => {
  if (isStartGame) {
    crateSaveFile(data);
    isStartGame = false;
    console.log('Начнем бросать монетку.');
    return;
  }
  console.log('Вжух');

  if (data == throwCoin()) {
    console.log('Поздравляю. Ты угадал');
    gameSessoin.push({ result: data, win: true });
  } else {
    console.log('Увы. Ты не угадал');
    gameSessoin.push({ result: data, win: false });
  }
});

input.on('close', () => {
  saveGame();
  console.log('Конец игры');
});