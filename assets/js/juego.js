/**
 * 
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 * 
 */

// Referecias manipulacion de datos
let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let pointsPlayer = 0;
let pointsComputer = 0;

// Referencias HTML DOM
const btnNewGame = document.querySelector('#btnNewGame');
const btnGetCard = document.querySelector('#btnGetCard');
const btnStop = document.querySelector('#btnStop');

const showPoints = document.querySelectorAll('strong');

const divPlayersCard = document.querySelector('#player-cards');
const divComputerCard = document.querySelector('#computer-cards');

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
 * Crea una nueva baraja.
 */
const createDeck = () => {

  const tmpDeck = [];

  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      tmpDeck.push(i + type);
    }
  }

  for (const type of types) {
    for (const special of specials) {
      tmpDeck.push(special + type);
    }
  }

  return shuffle(tmpDeck);

}

deck = createDeck();

/**
 * Esta funcion permite tomar una marca.
 */
const getCard = () => {

  if (deck.length == 0) {
    throw 'No hay más cartas disponibles';
  }
  const card = deck.pop();
  return card;

}

/**
 * Obtener en valor de la carta
 */
const valueCard = (card) => {

  const value = card.slice(0, card.length - 1);
  return isNaN(value) ? (value == 'A') ? 11 : 10 : parseInt(value);

}

/**
 * Computer
 */
const turnComputer = (minPoints) => {

  let pointsLimit = 21;

  do {

    const card = getCard();
    pointsComputer += valueCard(card);
    showPoints[1].innerText = pointsComputer;

    // Visualizar carta en Html
    const imgCard = document.createElement('img');
    imgCard.classList.add('img-card');
    imgCard.src = `./assets/cartas/${card}.png`;
    divComputerCard.appendChild(imgCard);

    if (minPoints > pointsLimit) {
      break;
    }

  } while ((minPoints > pointsComputer) && minPoints <= pointsLimit);


  setTimeout(() => {
    (pointsComputer === minPoints)
      ? alert('Nadie ha ganado 🙄 !!')
      : (minPoints > 21) ? alert('Computadora gano 🎉 !!')
        : (pointsComputer > 21) ? alert('Jugador gano 😎 !!') : alert('Computadora gano 😎 !!');
  }, 100);

}

const btnDisabled = (bool) => {

  btnGetCard.disabled = bool;
  btnStop.disabled = bool;
  btnNewGame.disabled = !bool;

}


/**
 * EVENTOS
 */

btnGetCard.addEventListener('click', () => {

  // Obtener carta
  const card = getCard();
  pointsPlayer += valueCard(card);
  showPoints[0].innerText = pointsPlayer;

  // Visualizar carta en Html
  const imgCard = document.createElement('img');
  imgCard.classList.add('img-card');
  imgCard.src = `./assets/cartas/${card}.png`;
  divPlayersCard.appendChild(imgCard);

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
  turnComputer(pointsPlayer);

});

btnNewGame.addEventListener('click', () => {

  deck = createDeck();
  pointsPlayer = 0;
  pointsComputer = 0;
  showPoints[0].innerText = pointsPlayer;
  showPoints[1].innerText = pointsPlayer;
  divPlayersCard.innerText = '';
  divComputerCard.innerText = '';
  btnDisabled(false);

});