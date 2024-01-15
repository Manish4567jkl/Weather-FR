#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import fetch from 'node-fetch';
import apiKey from './apikey.js';

let cityName;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
//! Not needed anymore --> const sleepForInput = (ms = 4000) => new Promise((r) => setTimeout(r, ms));

async function welcomeText() {
  const welcomeText = `WEATHER-FR`;
  figlet(welcomeText, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

async function askCityName() {
  const answer = await inquirer.prompt({
    name: 'city_name',
    type: 'input',
    message: 'Enter the name of the city:',
    default() {
      return null;
    },
  });

  await sleep();
  cityName = encodeURIComponent(answer.city_name);

}

async function showWeather() {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching weather data. Status: ${response.status}, ${response.statusText}`);
    }
    const data = await response.json();
    console.log(
      gradient.cristal(`Weather : ${data.weather[0].main}`),
      gradient.cristal(`Description : ${data.weather[0].description}`),
      gradient.cristal(`Temperature : ${data.main.temp}^C`),
      gradient.cristal(`Minimum-Temperature : ${data.main.temp_min}^C`),
      gradient.cristal(`Maximum-Temperature : ${data.main.temp_max}^C`),
      gradient.cristal(`Humidity : ${data.main.humidity} `)
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function main() {
  await welcomeText();
  await sleep();
  await askCityName();
  //await sleepForInput();
  await showWeather();
}

main();
