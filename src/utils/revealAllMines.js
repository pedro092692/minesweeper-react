function revealMines(board, rows, cols) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c].hasMine) {
            board[r][c].revealed = true;
            board[r][c].value = "💣";
          }
          if(!board[r][c].hasMine && board[r][c].flagged){
            board[r][c].revealed = true;
            board[r][c].value = "❌";
          }
        }
      }
    return board;
}

export default revealMines;