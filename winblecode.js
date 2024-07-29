console.log("WINBLECODE");

function createMatch(jug1, jug2){

  let jugadoresRonda = [jug1, jug2];  // Datos de los jugadores en curso
  let puntosRonda = [0, 0];  // Contador interno de puntos. Posibles valores y su relación con marcador "humano": 
                //  0,  1,  2,  3,  4,  5
  const marcador = [0, 15, 30, 40, "A", "W"]; // A y W para uso interno. No visible para usuario
  let statusRound = null; // null si no hay ganador del round. Nombre del jugador si ha ganado alguno ya el round
  let finPartido = false;
  let finalRonda = false;

  const partido = [
    {jugador: jug1, juegos: 0, rondas: 0},
    {jugador: jug2, juegos: 0, rondas: 0}
  ];


  const returnStatus = () => {
    if (puntosRonda[0] === 3 && puntosRonda[1] === 3){      
      return "Deuce";
    } // deuce
    else if (puntosRonda[0] === 4 && puntosRonda[1] === 3){
      return "Ventaja para " + jugadoresRonda[0];
    }//ventaja A
    else if (puntosRonda[0] === 3 && puntosRonda[1] === 4){
      return "Ventaja para " + jugadoresRonda[1];
    }//ventaja B
    else if (((puntosRonda[0] === 5) || (puntosRonda[0] === 4 && puntosRonda[1] < 3))){
      puntosRonda[0] = 0;
      puntosRonda[1] = 0;
      return "-- La ronda es para el Jugador A --";
    } // win A
    else if ((puntosRonda[1] === 5) || (puntosRonda[0] < 3 && puntosRonda[1] === 4)){
      puntosRonda[0] = 0;
      puntosRonda[1] = 0;
      return "-- La ronda es para el Jugador B --";
    } // win B 
    else {
      finalRonda = false;
      return "normal_playing";
    } // normal_playing
  }


  const actualizarEstado = () =>{

    //Check empate de rondas -> Si empatan en ventaja, reduzco a deuce de nuevo
    if (puntosRonda[0] === 4 && puntosRonda[1] === 4){
      puntosRonda[0] = 3;
      puntosRonda[1] = 3;
    }
    
    // Check rondas
    if (((puntosRonda[0] === 5) || (puntosRonda[0] === 4 && puntosRonda[1] < 3))){
      partido[0].rondas++;
      puntosRonda[0] = 0;
      puntosRonda[1] = 0;
      finalRonda = true;
    } 
    else if ((puntosRonda[1] === 5) || (puntosRonda[0] < 3 && puntosRonda[1] === 4)){
      partido[1].rondas++;
      puntosRonda[0] = 0;
      puntosRonda[1] = 0;
      finalRonda = true;
    }

    //Check juegos
    const rondasA = partido[0].rondas;
    const rondasB = partido[1].rondas;
    if (rondasA === 7 || (rondasA >= 4 && rondasB <= (rondasA -2 ))){
      partido[0].juegos++;
      partido[0].rondas = 0;
      partido[1].rondas = 0;
    } 
    else if (rondasB === 7 || (rondasB >= 4 && rondasA <= (rondasB -2 ))){
      partido[1].juegos++;
      partido[0].rondas = 0;
      partido[1].rondas = 0;
    } 
    
    // Check partido
    if (partido[0].juegos === 2 || partido[1].juegos === 2){
      puntosRonda[0] = 0;
      puntosRonda[1] = 0;
      finPartido = true;
    }
  }


  const pointWonBy = (jugNum) => {
    // verifico que no se intente añadir más puntos una vez finalizado el partido
    if (finPartido === true){ 
      throw new Error("Atención: no es posible añadir puntos a un partido finalizado");
    } else {
      let ind = jugNum - 1;
      puntosRonda[ind]++;
      statusRound = actualizarEstado(); 
    }
  }


  const getCurrentRoundScore = () => {

    let resultado = "";
    let status = returnStatus();
    if (status === "normal_playing" ){
      if (finalRonda === false){
        if (finPartido === false) {
          let puntosJ1 = jugadoresRonda[0] +"  "+ marcador[puntosRonda[0]];
          let puntosJ2 = marcador[puntosRonda[1]] +"  "+ jugadoresRonda[1];
          resultado =  puntosJ1 +" - "+ puntosJ2; 
        } else {
          resultado = "Fin de partido";        }
      }
    } else {
      resultado = status;
      finalRonda = false
    }
    return resultado
  }


  const getRoundsScore = () => {
    let resultado =  (`·Rondas
      ${partido[0].jugador}:  ${partido[0].rondas}
      ${partido[1].jugador}:  ${partido[1].rondas}`); 
    return resultado;
  }


  const getMatchScore = () => {

    return (`·Juegos
      ${partido[0].jugador}:  ${partido[0].juegos}
      ${partido[1].jugador}:  ${partido[1].juegos}`);
  }


  const getWinner = () => {
    if (partido[0].juegos === 2)
      return partido[0].jugador;
    else if (partido[1].juegos === 2)
      return partido[1].jugador;
    else
      return null;
  }


  return {
    createMatch: createMatch,
    pointWonBy: pointWonBy,
    getCurrentRoundScore: getCurrentRoundScore,
    getRoundsScore: getRoundsScore,
    getMatchScore: getMatchScore,
    getWinner: getWinner
  };
}




// ---------------------- TEST

// Ejemplo de software
const game = createMatch('Alberto C', 'David J');
// Cuando puntua el 1º judagor se registra de este modo
game.pointWonBy(1);
// Cuando puntua el 2º judagor se registra de este modo
game.pointWonBy(2);
// Quiero poder ver como va la ronda actual en todo momento
console.log(game.getCurrentRoundScore()); // Alberto C 15-15 David J
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Alberto C 30-15 David J
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Alberto C 30-30 David J
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Alberto C 40-30 David J
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Deuce
// jugador 1 toma ventaja
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Advantage Alberto C
// jugador 2 empata
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Deuce
// jugador 2 toma ventaja
game.pointWonBy(2);

console.log(game.getCurrentRoundScore()); // Advantage David J
// Con este punto jugador 2 gana la ronda
game.pointWonBy(2);
// Quiero poder ver como va la puntuación de un juego

console.log(game.getRoundsScore()); // Alberto C 0 David J 1
// La primera ronda es para David le quedan 3 para ganar un jueg



game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto



// David gana 2º ronda

game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto

// David gana 3º ronda

game.pointWonBy(2); // Player 2 wins the game
game.pointWonBy(2); // Player 2 wins the game
game.pointWonBy(2); // Player 2 wins the game
game.pointWonBy(2); // Player 2 wins the game

// // David gana 4º ronda

// // Primer juego ganado
 console.log(game.getMatchScore()); // Alberto C 0 David J 1


game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 1º
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 2º
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 3º
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 4º

// Método para ver los juegos de cada jugador
console.log(game.getMatchScore()); // Alberto C 0\nDavid J 2
// método para ver el ganador. Si aún no hay ganador retornar null
console.log(game.getWinner()); // Output: "David J"