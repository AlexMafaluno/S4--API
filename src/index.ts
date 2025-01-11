"use strict";

type ReportTypes = {

  id: number;

  joke: string;
 
  score: number;
 
  date: Date | string;

  isVouted?: boolean
 }


type JokeData = {
  attachments: {
      fallback: string;
      footer: string;
      text: string;
  }[];
  response_type: string;
  username: string;
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
    return data;
  })

  .catch((error) => {
    console.error('Hi ha hagut un error:', error);
    throw error;
  });
}



function main() {
  
  traerBroma()
    
  .then((data: JokeData) => {
    const chiste : string = data.attachments[0].text; // cada vez que llama a la fució traer roma deeria traer una broma nueva y guardarla e chiste
    displayBroma(chiste); // solo muestra e el dom
    crearAcudit(jokeId, chiste, score);  // primera roma co valores por
    })
  .catch((error) => {
      console.error("No se pudo completar el proceso:", error);
    });
}
  
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

