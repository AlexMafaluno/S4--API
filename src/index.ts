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


//usado el operador de aserció no nula !. Le digo a TS qie confie que el valor no es null
const resultDiv = document.getElementById('result')!;

const button = document.getElementById("otra-broma")!;
const bromaContainer = document.querySelector('.result');
let jokeId = 1;
let score = 0;
const reportAcudits : ReportTypes [] = [];


//validación 

if (!resultDiv || !button) {
  throw new Error("Los elementos del DOM no se encontraron correctamente.");
}

// llama a ua función que traerá una broma o otra
// maejo de promesas correctamente
async function alternarBroma() {
  let random = Math.random();
  console.log("Broma alternada: ", random);
  random > 0.5 ? await traerBroma() : await traerChuck();
};

function traerChuck(): Promise<ChuckNorrisJoke> {

  return fetch('https://api.chucknorris.io/jokes/random', {
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
    const chiste : string = data.value;
    console.log("Broma obtenida:", chiste);
    displayBroma(chiste);
    crearAcudit(jokeId, chiste, score);  // push al array
  })
  .catch((error) => {
    console.error('Hi ha hagut un error:', error);
    throw error;
  });
};

function traerBroma(): Promise<JokeData> {
  
  return fetch('https://icanhazdadjoke.com/slack', {
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

  .then((data: JokeData) => {
    console.log("Broma obtenida:", data);
    const chiste : string = data.attachments[0].text; // cada vez que llama a la fució traer roma deeria traer una broma nueva y guardarla e chiste
    displayBroma(chiste); // solo muestra e el dom
    crearAcudit(jokeId, chiste, score);  // push al array
  })

  .catch((error) => {
    console.error('Hi ha hagut un error:', error);
    throw error;
  });
}

async function traerTiempo() {
 
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&appid=6c67d66569fb8dd088c593f9164f514b&units=metric&lang=es', {
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
  console.log("Temperatura actual:", data.main.temp);
        }catch (error) {
            console.error('Error:', error);
        }
};


function mostrarTiempo(data: any) {
  const info = document.querySelector('#infoMeteo');
  const iconMeteo = document.querySelector('#iconMeteo');
  
  if (iconMeteo instanceof HTMLElement) {
    iconMeteo.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima">`;
    // iconMeteo.innerHTML = <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima">;
    // `<i class="wi wi-owm-${data.weather[0].id}"></i>`;
  }
    else {
    console.error('Element with ID "iconMeteo" not found or is not a valid HTML element');
  }
  if (info instanceof HTMLElement) {
    info.innerHTML = `${data.name}: ${data.weather[0].description} <br>
    ${parseInt(data.main.temp)}°C`;
  }
  else {
  console.error('Element with ID "infoMeteo" not found or is not a valid HTML element');
  }
};

function main() {
  traerTiempo()
  alternarBroma()
};

//DISPLAYS

function displayBroma(data : string) : void{
  resultDiv.innerHTML = data;
  };
  




// Función para crear un reporte de una broma
 function crearAcudit (id:number, joke: string, score: number ): void{
  

    const alreadyAcudit = reportAcudits.find((acudit) => acudit.id === id);
    console.log(alreadyAcudit);
    
    if (alreadyAcudit) return console.log("La broma ya ha sido reportada:", alreadyAcudit);
  
    
    // sio la ecuetra la crea
    const acudit: ReportTypes = {
      id,
      joke, 
      score, 
      date : new Date().toISOString(),
      isVouted: true,
    };

    // Guardar la broma en el array de reportes
  reportAcudits.push(acudit);
  console.log("Broma reportada:", acudit);
  console.log("Array de reportes actualizado:", reportAcudits);
  
  jokeId++;
  
}

// Al pulsar "Otra broma", guarda la actual en el array


/*
button.addEventListener("click", () => {
  const jokeText = resultDiv.textContent;
  console.log(jokeText);
  console.log(typeof jokeText);

  if (!jokeText) return console.error("No hay ninguna broma para guardar.");
  
  jokeId++; // ID de la broma por defecto
  let score = 0; // iicializar, // si o la putua se queedará a 0
  crearAcudit(jokeId, jokeText, score);

});

*/

//PUTUAR BROMA

function puntuarBroma(score: number): void {
  // Encuentra la última broma en el array
  const bromaActual = reportAcudits[reportAcudits.length - 1];

  if (!bromaActual) {
    console.error("No hay ninguna broma para puntuar.");
    return;
  }

  // Sumar el score al actual
  bromaActual.score += score;

  console.log("Broma puntuada:", bromaActual);
}



main();

