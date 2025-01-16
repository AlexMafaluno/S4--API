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
const resultDiv = document.getElementById('result');
const button = document.getElementById("otra-broma");
let jokeId = 1;
let score = 0;
const reportAcudits = [];
if (!resultDiv || !button) {
    throw new Error("Los elementos del DOM no se encontraron correctamente.");
}
function alternarBroma() {
    return __awaiter(this, void 0, void 0, function* () {
        const random = Math.random();
        const url = random > 0.5 ? url2 : url1;
        yield traerBromaRandom(url);
    });
}
;
const url1 = 'https://api.chucknorris.io/jokes/random';
const url2 = 'https://icanhazdadjoke.com/slack';
const urlTiempo = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&appid=6c67d66569fb8dd088c593f9164f514b&units=metric&lang=es';
function traerBromaRandom(url) {
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
        let chiste;
        if (url === url2) {
            chiste = data.attachments[0].text;
        }
        else if (url === url1) {
            chiste = data.value;
        }
        else {
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
}
;
function traerTiempo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(urlTiempo, {
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
function main() {
    traerTiempo();
    alternarBroma();
}
;
main();
// Función para crear un reporte de una broma
function crearAcudit(id, joke, score) {
    const alreadyAcudit = reportAcudits.find((acudit) => acudit.id === id);
    console.log(alreadyAcudit);
    if (alreadyAcudit)
        return console.log("La broma ya ha sido reportada:", alreadyAcudit);
    const acudit = { id, joke, score, date: new Date().toISOString() };
    reportAcudits.push(acudit);
    console.log("Array de reportes actualizado:", reportAcudits);
    jokeId++;
}
;
function puntuarBroma(score) {
    const bromaActual = reportAcudits[reportAcudits.length - 1];
    if (!bromaActual) {
        console.error("No hay ninguna broma para puntuar.");
        return;
    }
    if (bromaActual.score !== score) {
        bromaActual.score = score;
        console.log("El score ha cambiado a:", score);
    }
    else {
        console.log("El score ya es:", score);
    }
    console.log("Broma puntuada:", bromaActual);
}
