function flaggedCell(board, row, cel) {
    const cell = board[row][cel];
    cell.flagged = true;
    cell.value = "🚩"
    return board;
}

export default flaggedCell;