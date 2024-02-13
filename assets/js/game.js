/**
 * 
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 * 
 */

/**
 * Patrón Módulo
 */

const blackJack = (() => {
  'use strict'

  // Referecias manipulacion de datos
  let deck = [];
  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K'];

  let pointsPlayers = [];

  // Referencias HTML DOM
  const btnNewGame = document.querySelector('#btnNewGame');
  const btnGetCard = document.querySelector('#btnGetCard');
  const btnStop = document.querySelector('#btnStop');

  const showPoints = document.querySelectorAll('strong');

  const divCardsPlayers = document.querySelectorAll('.div-cards');

  /**
   * Cartas en desorden o barajar cartas.
   */
  const shuffle = (arr) => {

    const tmpArr = [...arr];
    const length = tmpArr.length;

    for (let i = 0; i < length; i++) {
      const rand_index = Math.floor(Math.random() * length);
      const rand = tmpArr[rand_index];

      tmpArr[rand_index] = tmpArr[i];
      tmpArr[i] = rand;
    }

    return tmpArr;

  }

  /**
   * Inicial juego.
   */
  const initializeGame = (numPLayers = 2) => {

    deck = createDeck();
    pointsPlayers = [];

    for (let i = 0; i < numPLayers; i++) {
      pointsPlayers.push(0);
      showPoints[i].innerText = 0;
      divCardsPlayers[i].innerHTML = '';

    }

    // showPoints.forEach(element => element.innerText = 0);
    btnDisabled(false);

  }

  /**
   * Crea una nueva baraja.
   */
  const createDeck = () => {

    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (const type of types) {
      for (const special of specials) {
        deck.push(special + type);
      }
    }

    return shuffle(deck);

  }

  /**
   * Esta funcion permite tomar una marca.
   */
  const getCard = () => {

    if (deck.length == 0) {
      throw 'No hay más cartas disponibles';
    }
    return deck.pop();

  }

  /**
   * Obtener en valor de la carta
   */
  const valueCard = (card) => {

    const value = card.slice(0, card.length - 1);
    return isNaN(value) ? (value == 'A') ? 11 : 10 : parseInt(value);

  }

  // Turn: 0 = Primer jugador y ultimo la computadora
  const accumulatePoints = (card, turn) => {

    pointsPlayers[turn] = pointsPlayers[turn] + valueCard(card);
    showPoints[turn].innerText = pointsPlayers[turn];
    return pointsPlayers[turn];

  }

  const createCard = (card, turn) => {

    const imgCard = document.createElement('img');
    imgCard.classList.add('img-card');
    imgCard.src = `./assets/cards/${card}.png`;
    divCardsPlayers[turn].appendChild(imgCard);

  }

  const determineWinner = () => {

    const [minimumPoints, computerPoints] = pointsPlayers;

    setTimeout(() => {
      (computerPoints === minimumPoints)
        ? alert('Nadie ha ganado 🙄 !!')
        : (minimumPoints > 21) ? alert('Computadora gano 🎉 !!')
          : (computerPoints > 21) ? alert('Jugador gano 😎 !!') : alert('Computadora gano 😎 !!');
    }, 100);

  }

  /**
   * Computer
   */
  const turnComputer = (minimumPoints) => {

    let pointsLimit = 21;
    let pointsComputer = 0;

    do {

      const turn = pointsPlayers.length - 1;
      const card = getCard();
      pointsComputer = accumulatePoints(card, turn);

      // Visualizar carta en Html
      createCard(card, turn);

    } while ((minimumPoints > pointsComputer) && minimumPoints <= pointsLimit);

    determineWinner();

  }

  const btnDisabled = (bool) => {

    btnGetCard.disabled = bool;
    btnStop.disabled = bool;
    btnNewGame.disabled = !bool;

  }

  // Deshabilitar botones
  btnDisabled(true);


  /**
   * EVENTOS
   */

  btnGetCard.addEventListener('click', () => {

    // Obtener carta
    const card = getCard();
    const pointsPlayer = accumulatePoints(card, 0);

    // Visualizar carta en Html
    createCard(card, 0);

    // Verificar resultado
    if (pointsPlayer > 21) {
      btnDisabled(true);
      turnComputer(pointsPlayer);
      return;
    } else if (pointsPlayer === 21) {
      btnDisabled(true);
      turnComputer(pointsPlayer);
      return;
    }

  });

  btnStop.addEventListener('click', () => {

    btnDisabled(true);
    turnComputer(pointsPlayers[0]);

  });

  btnNewGame.addEventListener('click', () => {
    initializeGame(2);
  });

  return {
    newGame: initializeGame
  }

})();