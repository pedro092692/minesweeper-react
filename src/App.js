import logo from './logo.svg';
import './App.css';
import Cell from './components/cell';
import Time from './components/time';
import NewGame from './components/newGame';
import { useState, useEffect } from 'react';


  // initialize board values
  
function App() {
  //define components values and props
  const ROWS = 5;
  const COLUMNS = 5;
  const NUM_MINES = 3;
  const settings = { value: " ", revealed: false, flagged: false, hasMine: false };

  const initialBoard = (cellIndex, rowIndex) => {
    const newBoard = Array(ROWS).fill(null).map(() => Array(COLUMNS).fill({...settings}));
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLUMNS);
      if (!newBoard[row][col].hasMine && row !== cellIndex && col !== rowIndex) {
        newBoard[row][col] = { ...settings, hasMine: true, value: "💣" };
        minesPlaced++;
      }
    }

    // calculate adjacent mines
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        if (!newBoard[row][col].hasMine) {
          let mineCount = 0;
          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && newBoard[r][c].hasMine) {
                mineCount++;
              }
            }
          }
          newBoard[row][col] = { ...settings, value: mineCount > 0 ? mineCount : " " };
        }
      }
    }
 
    return newBoard;
  }
  
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(" ")));
  const [icon, setIcon] = useState("😊");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleMouseDown = () => {
    setIcon("😱");
  }

  const handleMouseUp = () => {
    setIcon("😊");
  }

  const handleClickCell = (cellIndex, rowIndex) => {
    if (!isGameStarted) {
      setBoard(initialBoard(rowIndex, cellIndex))
      setIsGameStarted(true);
    }
  }

  const handleNewGame = () => {
    setIsGameStarted(false);
  }

  const cells = board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return <Cell 
        key={`${rowIndex}-${cellIndex}`} 
        id={`${rowIndex}-${cellIndex}`} 
        value={cell.value} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onClickCell={ () => handleClickCell(cellIndex, rowIndex) }
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
          000
        </div>
        <div className="tile d-flex justify-content-center align-items-center fs-4">
          <NewGame icon={icon} newGame={ handleNewGame }/>
        </div>
        <Time isGameStarted={ isGameStarted }/>
      </div>

      <div className="board-game">
        {cells}
      </div>
    </div>
  );
}

export default App;
