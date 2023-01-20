let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specialTypes = ['A', 'J', 'Q', 'K'];

let scorePlayer = 0, scoreComputer = 0;

// HTML References
const btnNewGame = document.querySelector('#btnNewGame');
const btnAskForCard = document.querySelector('#btnAskForCard');
const btnStop = document.querySelector('#btnStop');
const scoresHTML = document.querySelectorAll('small');
const divCardsPlayer = document.querySelector('#player-cards');
const divCardsComputer = document.querySelector('#computer-cards');
const msg = document.querySelector('h3');

const createDeck = () => {
	for( let i = 2; i <= 10; i++ ){
		for( let type of types ){
			deck.push( i + type );
		}
	}
	for( let type of types ){
		for( let special of specialTypes ){
			deck.push( special + type );
		}
	}
	deck = _.shuffle( deck );
	return deck;
}

createDeck();

const askForCard = () => {
	if( deck.length === 0 ){
		throw 'There are no more cards in the deck';
	}
	
	const card = deck.pop();
	return card;
}

const valueCard = ( card ) => {
	const value = card.substring(0, card.length - 1);
	// let score = 0;
	// if( isNaN(value) ){
	// 	score = ( value === 'A' ) ? 11 : 10;
	// }else{
	// 	// Multiply a string with 1 converts this to number
	// 	score = value * 1;
	// }
	// return score;

	return ( isNaN(value) ) ?
		( value === 'A' ) ? 11 : 10 
		: value * 1;
}

const computerTurn = ( minScorePlayer ) => {
	do{
		const card = askForCard();

		scoreComputer += valueCard( card );
		scoresHTML[1].innerText = scoreComputer;

		const imgCard = document.createElement('img');
		imgCard.src = `assets/cartas/${ card }.png`;
		imgCard.className = 'mycard';
		imgCard.alt = card;
		divCardsComputer.append( imgCard );

		if( minScorePlayer > 21 ){
			break;
		}
	}while( (scoreComputer < minScorePlayer) && (minScorePlayer <= 21) );

	setTimeout( () => {
		if( scoreComputer === minScorePlayer ){
			msg.innerText = 'Draw!';
		}else if( minScorePlayer > 21 ){
			msg.innerText = 'Computer wins!';
		}else if( scoreComputer > 21 ){
			msg.innerText = 'You win!';
		}else{
			msg.innerText = 'Computer wins!';
		}
	}, 10);
}

// Events
btnAskForCard.addEventListener('click', () => {
	const card = askForCard();

	scorePlayer += valueCard( card );
	scoresHTML[0].innerText = scorePlayer;

	const imgCard = document.createElement('img');
	imgCard.src = `assets/cartas/${ card }.png`;
	imgCard.className = 'mycard';
	imgCard.alt = card;
	divCardsPlayer.append( imgCard );

	if( scorePlayer > 21 ){
		btnAskForCard.disabled = true;
		btnStop.disabled = true;
		computerTurn( scorePlayer );
	}else if( scorePlayer === 21 ){
		btnAskForCard.disabled = true;
		btnStop.disabled = true;
		computerTurn( scorePlayer );
	}
});

btnStop.addEventListener('click', () => {
	btnAskForCard.disabled = true;
	btnStop.disabled = true;
	computerTurn( scorePlayer );
});

btnNewGame.addEventListener('click', () =>{

	deck = [];
	deck = createDeck();

	scorePlayer = 0;
	scoreComputer = 0;
	scoresHTML[0].innerText = 0;
	scoresHTML[1].innerText = 0;

	divCardsComputer.innerHTML = '';
	divCardsPlayer.innerHTML = '';
	msg.innerHTML = '';

	btnAskForCard.disabled = false;
	btnStop.disabled = false;
	
});