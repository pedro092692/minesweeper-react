function Cell({value, id, onClickCell, onMouseDown, onMouseUp, revealed, hasMine}) {
    return (
        <div className={`tile d-flex justify-content-center align-items-center fs-4 fw-bold text-success ${revealed ? "revealed" : ""} ${hasMine && revealed ? "mine" : ""}`} 
                id={id} 
                onClick={onClickCell} 
                onMouseDown={onMouseDown} 
                onMouseUp={onMouseUp}>
                {value === " " ? "\u00A0" : value}
        </div>
    )
}

export default Cell;