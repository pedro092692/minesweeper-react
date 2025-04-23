function flaggedCell(board, row, cel, flagged=true) {
    const cell = board[row][cel];
    if (flagged){
        cell.flagged = true;
        cell.value = "🚩"
    }else{
        cell.flagged = false;
        cell.value = " "
    }
    return board;
}

export default flaggedCell;