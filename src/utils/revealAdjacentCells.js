function revealAdjacentCells(rowIndex, cellIndex, board, rows, cols) {
    for (let r = rowIndex - 1; r <= rowIndex + 1; r++) {
      for (let c = cellIndex - 1; c <= cellIndex + 1; c++) {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
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

export default revealAdjacentCells;