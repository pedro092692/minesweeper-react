function boardValuesMap(size) {
    const values = ['0', '1', '2', '*'];
    const board = [];
    for (let i = 0; i < size; i++){
        let value = values[Math.floor(Math.random() * values.length)]
        board.push(value);
    }
    return board;
}

export default boardValuesMap;