import logo from './logo.svg';
import './App.css';
import Cell from './components/cell';
import Time from './components/time';
import NewGame from './components/newGame';
import { useState } from 'react';

  
function App() {
  //define components values and props
  const ROWS = 5;
  const COLUMNS = 5;
  const NUM_MINES = 5;
  const settings = { value: " ", revealed: false, flagged: false, hasMine: false, adyacentMines: 0 };
  

  // initialize board values
  const initialBoard = (cellIndex, rowIndex) => {
    const newBoard = Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(" "));
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLUMNS);
      if (!newBoard[row][col].hasMine && row !== rowIndex && col !== cellIndex) {
        newBoard[row][col] = { ...settings, hasMine: true };
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
          newBoard[row][col] = { ...settings, adyacentMines: mineCount };
        }
      }
    }
 
    return newBoard;
  }
  
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill({...settings})));
  const [icon, setIcon] = useState("😊");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [mines, setMines] = useState(NUM_MINES);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleMouseDown = () => {
    setIcon("😱");
  }

  const handleMouseUp = () => {
    setIcon("😊");
  }

  const revealAdjacentCells = (rowIndex, cellIndex, board) => {
    for (let r = rowIndex - 1; r <= rowIndex + 1; r++) {
      for (let c = cellIndex - 1; c <= cellIndex + 1; c++) {
        if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS) {
          if (!board[r][c].revealed && !board[r][c].flagged && !board[r][c].hasMine) {
              board[r][c].revealed = true;
              if (board[r][c].adyacentMines > 0) {
                board[r][c].value = board[r][c].adyacentMines;
              }
            if (board[r][c].value === " " && board[r][c].adyacentMines === 0) {
              revealAdjacentCells(r, c, board);
            }
          }
        }
      }
    }
  }

  const handleClickCell = (cellIndex, rowIndex) => {
    // check if cell is already revealed or flagged
    if (board[rowIndex][cellIndex].revealed || board[rowIndex][cellIndex].flagged || isGameOver) {
      return;
    }
    // check if game is already started
    if (!isGameStarted) {
      const newBoard = initialBoard(cellIndex, rowIndex);
      setBoard(newBoard);
      setIsGameStarted(true);
      // handle first click
      const updatedBoard = [...newBoard];
      updatedBoard[rowIndex][cellIndex].revealed = true;
      revealAdjacentCells(rowIndex, cellIndex, updatedBoard);

      // set the board with the updated values
      setBoard(updatedBoard);
    }else{
      const newBoard = [...board];
      newBoard[rowIndex][cellIndex].revealed = true;
      // check if cell has mine
      if (newBoard[rowIndex][cellIndex].hasMine) {
        setIcon("😭");
        // revealed all mines
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLUMNS; c++) {
            if (newBoard[r][c].hasMine) {
              newBoard[r][c].revealed = true;
              newBoard[r][c].value = "💣";
            }
          }
        }
        
        setIsGameOver(true)
        setBoard(newBoard);
        return;
      }
      revealAdjacentCells(rowIndex, cellIndex, newBoard);
      setBoard(newBoard);
    }    
  }

  const handleNewGame = () => {
    if (isGameOver) {
      setIcon("😊");
      setIsGameStarted(false);
      setIsGameOver(false);
      setBoard(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill({...settings})));
    }
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
          {mines.toString().padStart(3, '0')}
        </div>
        <div className="tile d-flex justify-content-center align-items-center fs-4">
          <NewGame icon={icon} newGame={ handleNewGame }/>
        </div>
        <Time isGameStarted={ isGameStarted } isGameOver={isGameOver} />
      </div>

      <div className="board-game">
        {cells}
      </div>
    </div>
  );
}

export default App;
