import logo from './logo.svg';
import './App.css';
import Cell from './components/cell';
import Time from './components/time';
import NewGame from './components/newGame';
import InitBoard from './utils/initialBoard';
import revealMines from './utils/revealAllMines';
import flaggedCell from './utils/flaggedCell';
import revealAdjacent from './utils/revealAdjacentCells';
import { useState } from 'react';

  
function App() {
  //define game setup
  const ROWS = 5;
  const COLUMNS = 5;
  const NUM_MINES = 5;
  const settings = { value: " ", revealed: false, flagged: false, hasMine: false, adyacentMines: 0 };
  
  // game hooks
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill({...settings})));
  const [icon, setIcon] = useState("😊");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [mines, setMines] = useState(NUM_MINES);
  const [isGameOver, setIsGameOver] = useState(false);

  // handle mouse down event to change emoji icon to 😱
  const handleMouseDown = () => {
    // ignore is game is over.
    if (isGameOver) {
      return;
    }
    setIcon("😱");
  }
  // handle mouse up event to change emoji incon to 😊
  const handleMouseUp = () => {
    // ignore is game is over.
    if (isGameOver) {
      return;
    }
    setIcon("😊");
  }

  // handle cell click
  const handleClickCell = (cellIndex, rowIndex) => {
    // check if cell is already revealed or flagged
    if (board[rowIndex][cellIndex].revealed || board[rowIndex][cellIndex].flagged || isGameOver) {
      return;
    }
    // check if game is already started
    if (!isGameStarted) {
      // first click on game (set new board ) avoid place mine on user selected cell.
      const newBoard = startNewBoard(rowIndex, cellIndex, false)
      
      // reveal user selected cell
      const updatedBoard = [...newBoard];
      updatedBoard[rowIndex][cellIndex].revealed = true;
      
      // reveal Adjacent Cell
      revealAdjacent(rowIndex, cellIndex, updatedBoard, ROWS, COLUMNS)

      // set the board with the updated values
      setBoard(updatedBoard);
    }else{
      // if game already started reveal selected cell and check if is has a mine.
      const newBoard = [...board];
      // reveal user selected cell
      newBoard[rowIndex][cellIndex].revealed = true;
      // check if cell has mine
      if (newBoard[rowIndex][cellIndex].hasMine) {
        setIcon("😭");
        // revealed all mines
        const boardRevealed = revealMines(newBoard, ROWS, COLUMNS);
        setIsGameOver(true)
        setBoard(boardRevealed);
        return;
      }
      // reveal Adjacent Cells
      revealAdjacent(rowIndex, cellIndex, newBoard, ROWS, COLUMNS)
      setBoard(newBoard);
    }    
  }

  // flagged cell (right click)
  const handleRightClickCell = (event, cellIndex, rowIndex) => {
    event.preventDefault();
    if (isGameOver || board[rowIndex][cellIndex].revealed) {
      return;
    }
    // check if game is already started
    if (!isGameStarted) {
      // set new board when first user click is flaggled a cell don't avoid selected cell been a mine.
      const newBoard = startNewBoard(rowIndex, cellIndex, true);
      // flagged selected cell
      const updateBoard = [...newBoard];
      const flaggedBoard = flaggedCell(updateBoard, rowIndex, cellIndex);
      setBoard(flaggedBoard);
      // subtract mines count
      setMines((prevMines) => prevMines - 1);
      return;
    }
    const newBoard = [...board];
    // check if selected cell is already flagged 
    if (newBoard[rowIndex][cellIndex].flagged) {
        const flaggedBoard = flaggedCell(newBoard, rowIndex, cellIndex, false);
        setBoard(flaggedBoard);
        // add mines count
        setMines((prevMines) => prevMines + 1);
        return
    }
    // flagged selected cell
    const flaggedBoard = flaggedCell(newBoard, rowIndex, cellIndex);
    // subtract mines count
    setMines((prevMines) => prevMines - 1);
    setBoard(flaggedBoard);
  }

  // set new game Board
  function startNewBoard (row, col, flagged){
    const newBoard = InitBoard(row, col, settings, ROWS, COLUMNS, NUM_MINES, flagged); // setup the board
      setBoard(newBoard);
      setIsGameStarted(true);
      return newBoard;
  }

  // set new game
  const handleNewGame = () => {
    if (isGameOver) {
      resetGame();
    }
  }
  
  // reset game
  function resetGame(){
    setIsGameOver(false);
    setIsGameStarted(false);
    setMines(5);
    setIcon("😊");
    setBoard(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill({...settings})));
  }

  // save board cells in varible
  const cells = board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return <Cell 
        key={`${rowIndex}-${cellIndex}`} 
        id={`${rowIndex}-${cellIndex}`} 
        value={cell.value} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onClickCell={ () => handleClickCell(cellIndex, rowIndex) }
        onRightClick={ (event) => handleRightClickCell(event, cellIndex, rowIndex) }
        revealed={cell.revealed}
        hasMine={cell.hasMine}
      />
    })
  }) 
 

  return (
    <div className="app d-flex flex-column rounded-top align-items-center gap-4">
      <div className="bar rounded-top px-2 d-flex align-items-center gap-1 w-100">
        <img src="./images/mine.png" alt="minesweeper logo" />
        <span className="mb-1">Buscaminas</span>
      </div>
      
      <div className="game-score  d-flex align-items-center justify-content-between  px-2">
        
        <div className="score-game d-flex justify-content-center align-items-center text-danger">
          {/* render remaining mines */}
          {mines < 0 ? mines : mines.toString().padStart(3, '0')}
        </div>

        <div className="tile d-flex justify-content-center align-items-center fs-4">
          {/* newgame component */}
          <NewGame icon={icon} newGame={ handleNewGame }/>
        </div>
        
        {/* time component */}
        <Time isGameStarted={ isGameStarted } isGameOver={isGameOver} />
      
      </div>

      <div className="board-game">
        {/* render cells */}
        {cells}
      </div>
    </div>
  );
}

export default App;
