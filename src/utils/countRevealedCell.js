function countRevealed (board, rows, cols){
    let count = 0
    for(let r = 0; r < rows; r++ ){
        for(let c = 0; c < cols; c++){
            if (!board[r][c].hasMine && board[r][c].revealed){
                count ++;
            }
        }
    }
    return count;
}

export default countRevealed;