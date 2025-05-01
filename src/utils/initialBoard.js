function initialBoard(rowIndex, cellIndex, settings, rows, cols, n_mines, flagged=false) {
    const newBoard = Array(rows).fill(null).map(() => Array(cols).fill({...settings}));
    let minesPlaced = 0;
    while (minesPlaced < n_mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!flagged){
        if (!newBoard[row][col].hasMine && row !== rowIndex && col !== cellIndex) {
            newBoard[row][col] = { ...settings, hasMine: true, };
            minesPlaced++;
          }
      }else{
        if (!newBoard[row][col].hasMine) {
            newBoard[row][col] = { ...settings, hasMine: true, };
            minesPlaced++;
          }
      }
      
    }

    // calculate adjacent mines
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!newBoard[row][col].hasMine) {
            let mineCount = 0;
            for (let r = row - 1; r <= row + 1; r++) {
              for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < rows && c >= 0 && c < cols && newBoard[r][c].hasMine) {
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

export default initialBoard;