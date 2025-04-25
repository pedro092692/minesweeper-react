function Cell({value, id, onClickCell, onMouseDown, onMouseUp, revealed, hasMine, onRightClick, size }) {
    return (
        <div className={`tile d-flex justify-content-center align-items-center fs-4 fw-bold text-success ${revealed ? "revealed" : ""} ${hasMine && revealed ? "mine" : ""} ${size}`}
                id={id} 
                onClick={onClickCell} 
                onMouseDown={onMouseDown} 
                onMouseUp={onMouseUp}
                onContextMenu={ onRightClick }
                >
                {value === " " ? "\u00A0" : value}
        </div>
    )
}

export default Cell;