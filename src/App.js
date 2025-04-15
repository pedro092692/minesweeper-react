import logo from './logo.svg';
import './App.css';
import Cell from './components/cell';
import Time from './components/time';
import boardValuesMap from './utils/valuesMap.js';
import { useState } from 'react';

  // initialize board values
  const values = boardValuesMap(25);
function App() {
  //define components values and props


  //define board values
  const [valuesMap, setValuesMap] = useState(Array(25).fill(" "));
  const cells = valuesMap.map((item, index) => <Cell key={index} onClickCell={ () => showValue(index) } value={item} />);

  //handle start game button
  const startGame = () => {
    //define components values 
    setValuesMap(Array(25).fill(" "));
  };

  const showValue = (index) => {
    const newValuesMap = [...valuesMap];
    newValuesMap[index] = values[index];
    setValuesMap(newValuesMap);
  }

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
        <div className="tile d-flex justify-content-center align-items-center fs-4" onClick={startGame}>
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
