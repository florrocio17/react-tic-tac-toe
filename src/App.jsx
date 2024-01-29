import {useState} from 'react';

import Player from "./components/player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


//helper function
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  // the first element in the array will be the latest turn played
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
    }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])]
  //Gameboard is a computed value that is derived from the gameTurns state that is managed in the app component and uses the prop turns
  // to use it in this component
  //We are deriving the gameboard from that state.

  // HERE WE ARE UPDATING THE GAMEBOARD FOR EVERY CLICK ON A BUTTON, WE KNOW WHAT BUTTON WAS CLICKED AND WHICH PLAYER CLICKED IT
  //it makes more sense to lift that state that manages the current information about the progress of our game
  //up from the game board component to the app component, it's this app component that then has access to both the log,
  //which needs this information, and to the game board component which also needs information about the current state of the game.

  for(const turn of gameTurns) {
      // every turn in the turns array will be an object, we have to destructure 
      const { square, player} = turn;
      const { row, col} = square;
      // we update the gameboard square with the player symbol
      gameBoard[row][col] = player;

  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  // we use an object instead of an array because the players names are attached to their symbols
  const [ players, setPlayers ] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
// Instead of having a dedicated activePlayer state, we could add some derived state
//  const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
//   setActivePlayer((CurActivePlayer) => CurActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      // we use the helper function to avoid code duplication
      const currentPlayer = deriveActivePlayer(prevTurns);
      // we want the array full of objects, we want to know what square was clicked and which player clicked that square
      const updatedTurns = [
        {square : {row : rowIndex, col : colIndex}, player: currentPlayer }, ...prevTurns
      ]
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers( prevPlayers => {
      console.log(prevPlayers)
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
    
  console.log(players)
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
          />
          <Player initialName={PLAYERS.O} 
          symbol="O" 
          isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} 
        board={gameBoard}
        />
      </div>
      <Log 
      turns={gameTurns}/>
    </main>
  )
}

export default App
