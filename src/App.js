import logo from './logo.svg';
import './App.css';
import Cell from './components/cell';
import Time from './components/time';
import { useState, useEffect } from 'react';

  // initialize board values
  
function App() {
  //define components values and props
  const ROWS = 5;
  const COLUMNS = 5;
  const NUM_MINES = 3;
  const settings = { value: " ", revealed: false, flagged: false, hasMine: false };

  const initialBoard = () => {
    const newBoard = Array(ROWS).fill(null).map(() => Array(COLUMNS).fill({...settings}));
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLUMNS);
      if (!newBoard[row][col].hasMine) {
        newBoard[row][col] = { ...settings, hasMine: true, value: "💣" };
        minesPlaced++;
      }
    }
 
    return newBoard;
  }
  const [board, setBoard] = useState(initialBoard);
  console.log(board);


  const cells = board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return <Cell key={`${rowIndex}-${cellIndex}`} id={`${rowIndex}-${cellIndex}`} value={cell.value} />
    })
  }) 

  //handle start game button
  // const startGame = () => {
  //   //define components values 
  //   setValuesMap(Array(25).fill(" "));
  // };

  // const showValue = (index) => {
  //   const newValuesMap = [...valuesMap];
  //   newValuesMap[index] = values[index];
  //   setValuesMap(newValuesMap);
  // }

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
          <button className='bg-transparent border-0'>😊</button>
        </div>
        <Time />
      </div>

      <div className="board-game">
        {cells}
      </div>
    </div>
  );
}

export default App;
