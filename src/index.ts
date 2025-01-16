"use strict";

type ReportTypes = {

  id: number;
  joke: string;
  score: number;
  date: Date | string
  isVouted?: boolean
 };

type JokeData = {
  attachments: {
      fallback: string;
      footer: string;
      text: string;
  }[];
  response_type: string;
  username: string;
};

type WeatherData = {
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  name: string;
};

type ChuckNorrisJoke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

const resultDiv = document.getElementById('result')!;
const button = document.getElementById("otra-broma")!;
let jokeId: number = 1;
let score: number = 0;
const reportAcudits : ReportTypes [] = [];


if (!resultDiv || !button) {
  throw new Error("Los elementos del DOM no se encontraron correctamente.");
}


async function alternarBroma(): Promise<void> {
  const random = Math.random();
  const url = random > 0.5 ? url2 : url1;
  await traerBromaRandom(url);
};

const url1: string = 'https://api.chucknorris.io/jokes/random';
const url2: string = 'https://icanhazdadjoke.com/slack';
const urlTiempo: string = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&appid=6c67d66569fb8dd088c593f9164f514b&units=metric&lang=es';

function traerBromaRandom(url: string): Promise<JokeData> {
 return fetch(url, {
  method: 'GET',
  headers: {
      'Accept': 'application/json'
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error('Error en la resposta de l\'API');
  }  
  return response.json();
})
.then((data) => {
 
  let chiste : string;

  if(url === url2){ chiste = data.attachments[0].text;
  }else if(url === url1){
    chiste = data.value;
  }else {
    throw new Error('Fuente de datos no reconocida');
  }

  resultDiv.innerHTML = chiste;
  crearAcudit(jokeId, chiste, score); 
  return data;
})
.catch((error) => {
  console.error('Hi ha hagut un error:', error);
  throw error;
});
};

async function traerTiempo() {
 
  try {
    const response = await fetch(urlTiempo, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error('Error en la resposta de l\'API');
  }  
  const data: WeatherData = await response.json();
  mostrarTiempo(data);
  }catch (error) {
    console.error('Error:', error);
  }
};


function mostrarTiempo(data: any) {
  const info = document.querySelector('#infoMeteo');
  const iconMeteo = document.querySelector('#iconMeteo');
  
  if (iconMeteo instanceof HTMLElement) {
    iconMeteo.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima">`;
  } else {
    console.error('Element with ID "iconMeteo" not found or is not a valid HTML element');
  }
  
  if (info instanceof HTMLElement) {
    info.innerHTML = `${data.name}: ${data.weather[0].description} <br>
    ${parseInt(data.main.temp)}°C`;
  } else {
  console.error('Element with ID "infoMeteo" not found or is not a valid HTML element');
  }
};

function main() {
  traerTiempo()
  alternarBroma()
};
main();


// Función para crear un reporte de una broma
 function crearAcudit (id:number, joke: string, score: number ): void{
  
  const alreadyAcudit = reportAcudits.find((acudit) => acudit.id === id);
  console.log(alreadyAcudit);
    
  if (alreadyAcudit) return console.log("La broma ya ha sido reportada:", alreadyAcudit);
  const acudit: ReportTypes = { id, joke, score, date : new Date().toISOString()};

  reportAcudits.push(acudit);
  console.log("Array de reportes actualizado:", reportAcudits);  
  jokeId++;
};

function puntuarBroma(score: number): void {
  
  const bromaActual = reportAcudits[reportAcudits.length - 1];
  if (!bromaActual) {
    console.error("No hay ninguna broma para puntuar.");
    return;
  }
  if (bromaActual.score !== score) {
    bromaActual.score = score;
    console.log("El score ha cambiado a:", score);
  } else {
    console.log("El score ya es:", score);
  }
  console.log("Broma puntuada:", bromaActual);
}





