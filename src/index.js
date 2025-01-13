"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//usado el operador de aserció no nula !. Le digo a TS qie confie que el valor no es null
const resultDiv = document.getElementById('result');
const button = document.getElementById("otra-broma");
const bromaContainer = document.querySelector('.result');
let jokeId = 1;
let score = 0;
const reportAcudits = [];
//validación 
if (!resultDiv || !button) {
    throw new Error("Los elementos del DOM no se encontraron correctamente.");
}
function traerBroma() {
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
        .then((data) => {
        console.log("Broma obtenida:", data);
        return data;
    })
        .catch((error) => {
        console.error('Hi ha hagut un error:', error);
        throw error;
    });
}
function traerTiempo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&appid=6c67d66569fb8dd088c593f9164f514b&units=metric&lang=es', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Error en la resposta de l\'API');
            }
            const data = yield response.json();
            mostrarTiempo(data);
            console.log("Temperatura actual:", data.main.temp);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
;
function mostrarTiempo(data) {
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
}
;
traerTiempo();
/*
async function traerTiempo(){
  console.log("Estoy en traer tiempo");
  try {
    const response = await fetch('http://localhost:4000/api/temperatura', {
    method: 'GET',
    headers: {  'Accept': 'application/json'
    },
    })

  if (!response.ok) {
    throw new Error('Error en la resposta de l\'API');
  }
  const data = await response.json();
  const temperature = data.current.temperature;
  console.log("Temperatura actual:", temperature);
  displayTemperature(temperature);

} catch (error) {
  console.error('Hi ha hagut un error:', error);
  throw error;
}

};

*/
function main() {
    traerBroma()
        .then((data) => {
        const chiste = data.attachments[0].text; // cada vez que llama a la fució traer roma deeria traer una broma nueva y guardarla e chiste
        displayBroma(chiste); // solo muestra e el dom
        crearAcudit(jokeId, chiste, score); // primera roma co valores por
    })
        .catch((error) => {
        console.error("No se pudo completar el proceso:", error);
    });
    console.log("Aquí llego");
    traerTiempo();
}
;
//DISPLAYS
function displayBroma(data) {
    resultDiv.innerHTML = data;
}
;
function displayTemperature(data) {
    const temperatureDiv = document.getElementById('temperatura');
    temperatureDiv.innerHTML = `La temperatura actual es: ${data}°C`;
}
;
// Función para crear un reporte de una broma
function crearAcudit(id, joke, score) {
    const alreadyAcudit = reportAcudits.find((acudit) => acudit.id === id);
    console.log(alreadyAcudit);
    if (alreadyAcudit)
        return console.log("La broma ya ha sido reportada:", alreadyAcudit);
    // sio la ecuetra la crea
    const acudit = {
        id,
        joke,
        score,
        date: new Date().toISOString(),
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
function puntuarBroma(score) {
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
