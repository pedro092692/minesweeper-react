function Cell({value, id, onClickCell, onMouseDown, onMouseUp, revealed}) {
    return (
        <div className={`tile d-flex justify-content-center align-items-center fs-4 fw-bold text-success ${revealed ? "revealed" : ""}`} 
                id={id} 
                onClick={onClickCell} 
                onMouseDown={onMouseDown} 
                onMouseUp={onMouseUp}>
                {value === " " ? "\u00A0" : value}
        </div>
    )
}

export default Cell;