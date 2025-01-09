"use strict";

type ReportTypes = {

  id: number;

  joke: string;
 
  score: number;
 
  date: Date;

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
let jokeId = 0;

//validación 

if (!resultDiv || !button) {
  throw new Error("Los elementos del DOM no se encontraron correctamente.");
}

const reportAcudits : ReportTypes [] = [];



function traerBroma(){
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
   // crearAcudit(id, joke, score = 0);
  })
  .catch(error => {
    console.error('Hi ha hagut un error:', error);
});

}

function displayBroma(data : JokeData) : void {
  
  const chiste = data.attachments[0].text;
  console.log(chiste);
  console.log(typeof chiste);
  resultDiv.innerHTML = chiste;
  };
  

// Función para crear un reporte de una broma
 function crearAcudit (id:number, joke: string, score: number ): ReportTypes{
    

    const alreadyAcudit = reportAcudits.find((acudit) => acudit.id === id);
    
    
    if (alreadyAcudit) {
      console.log("La broma ya ha sido reportada:", alreadyAcudit);
    return alreadyAcudit;
    };

    // sio la ecuetra la crea
    const acudit: ReportTypes = {
      id,
      joke, 
      score, 
      date : new Date(),
      isVouted: true,
    };

    // Guardar la broma en el array de reportes
  reportAcudits.push(acudit);
  console.log("Broma reportada:", acudit);
  console.log("Array de reportes actualizado:", reportAcudits);

  return acudit;
}



// Conectar la API con el botón del DOM
button.addEventListener("click", traerBroma);
  
// Al pulsar "Otra broma", guarda la actual en el array
button.addEventListener("click", () => {
  const jokeText = resultDiv.textContent;

  if (!jokeText) {
    console.error("No hay ninguna broma para guardar.");
    return;
  }
 
   // ID de la broma por defecto
  jokeId++;
   const score = 0; // Score inicial por defecto

  crearAcudit(jokeId, jokeText, score);
});


function puntuarBroma( score: number, id:number): void {

  console.log(" Puntuación de:", score);
  
  const punts = reportAcudits.find( acudit => acudit.id === id);
  console.log(punts);
  if(!punts){
    console.error("No se ha encontrado la broma a puntuar");
    
  }else{
    // Actualizar el score directamente
    punts.score = score; // Asignar el nuevo score
    console.log("Broma puntuada:", punts);
  }
  // ates de llamarla hay que validar si la roma ya existe!!
  //crearAcudit(punts.id, punts.joke, score);
}


