"use strict";

const resultDiv = document.getElementById('result');
const button = document.querySelector("button");
const bromaContainer = document.querySelector('.result');


function traerBroma() {
    fetch('https://icanhazdadjoke.com/slack', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => {
        if (!res.ok) {
            throw new Error('Error en la resposta de l\'API');
        }
        return res.json();
    })
        .then(data => {
        console.log(data);
        displayBroma(data);
    })
        .catch(error => {
        console.error('Hi ha hagut un error:', error);
    });
}
function displayBroma(data) {
    const chiste = data.attachments[0].text;
    console.log(chiste);
    resultDiv.innerHTML = chiste;
}
traerBroma();
