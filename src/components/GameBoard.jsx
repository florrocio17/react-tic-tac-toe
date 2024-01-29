
const GameBoard = ({onSelectSquare, board }) => {

   

        
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)
    
    // function handleSelectSquare (rowIndex, colIndex) {
         
    //     setGameBoard(()=> {
    //        const updateBoard = gameBoard.map(innerArray => [...innerArray]);
    //        updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //        return updateBoard;
    //     });
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
            {/* // onClick does not give us this row and call index data. To make sure that we get this information about which button
            in which row and which column was clicked, we should create an anonymous function that we pass 
            to onClick so that we got full control over how onSelectSquare will be executed. */}
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                        // if playerSymbol is either X or O, disabled would be true and the button
                        // couldnt be clicked again
                        disabled={playerSymbol !== null}
                        >{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
            
        </ol>
    )
}

export default GameBoard;