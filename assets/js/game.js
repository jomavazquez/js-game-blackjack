const gameBJ = (() => {
	'use strict'

	let deck = [];
	const types = ['C', 'D', 'H', 'S'],
		  specialTypes = ['A', 'J', 'Q', 'K'];

	let scorePlayers = [];

	// HTML References
	const btnNewGame = document.querySelector('#btnNewGame'),
		  btnAskForCard = document.querySelector('#btnAskForCard'),
		  btnStop = document.querySelector('#btnStop');

	const divCardsPlayers = document.querySelectorAll('.cards'), 
		  scoresHTML = document.querySelectorAll('small'),
		  msg = document.querySelector('h3');

  	const initGame = ( numPlayers = 2 ) => {
		deck = createDeck();
		scorePlayers = [];
		for( let i = 0; i < numPlayers; i++ ){
			scorePlayers.push(0);
			scoresHTML[i].innerText = 0;
			divCardsPlayers[i].innerHTML = '';
		}

		msg.innerHTML = '';

		btnAskForCard.disabled = false;
		btnStop.disabled = false;
	}

	const createDeck = () => {
		deck = [];
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
		return _.shuffle( deck );
	}

	const askForCard = () => {
		if( deck.length === 0 ){
			throw 'There are no more cards in the deck';
		}
		return deck.pop();
	}

	const valueCard = ( card ) => {
		const value = card.substring(0, card.length - 1);
		return ( isNaN(value) ) ?
			( value === 'A' ) ? 11 : 10 
			: value * 1;
	}

	const acumulateScore = ( card, turn ) => {
		// Turn 0: first player
		// Last turn: Computer
		scorePlayers[ turn ] += valueCard( card );
		scoresHTML[ turn ].innerText = scorePlayers[ turn ];
		return scorePlayers[ turn ];
	}

	const paintCard = ( card, turn ) => {
		const imgCard = document.createElement('img');
		imgCard.src = `assets/cartas/${ card }.png`;
		imgCard.className = 'mycard';
		imgCard.alt = card;
		divCardsPlayers[ turn ].append( imgCard );
	}

	const checkWinner = () => {
		const [ minScore, scoreComputer ] = scorePlayers;

		setTimeout( () => {
			if( scoreComputer === minScore ){
				msg.innerText = 'Draw!';
			}else if( minScore > 21 ){
				msg.innerText = 'Computer wins!';
			}else if( scoreComputer > 21 ){
				msg.innerText = 'You win!';
			}else{
				msg.innerText = 'Computer wins!';
			}
		}, 10);
	}

	const computerTurn = ( minScorePlayer ) => {
		let scoreComputer = 0;
		do{
			const card = askForCard();
			scoreComputer = acumulateScore( card, scorePlayers.length - 1 );
			paintCard( card, scorePlayers.length - 1 );
		}while( (scoreComputer < minScorePlayer) && (minScorePlayer <= 21) );
		checkWinner();
	}

	// Events
	btnAskForCard.addEventListener('click', () => {
		const card = askForCard();
		const scorePlayer = acumulateScore( card, 0 );
		paintCard( card, 0 );

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
		computerTurn( scorePlayers[0] );
	});

	btnNewGame.addEventListener('click', () =>{
		initGame();
	});

	return {
		newGame: initGame
	};

})();