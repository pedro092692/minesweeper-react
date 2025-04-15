function Cell({value, onClickCell}) {
    return (
        <div className="tile d-flex justify-content-center align-items-center fs-4 fw-bold text-success" onClick={onClickCell}>
            {value === " " ? "\u00A0" : value}
        </div>
    )
}

export default Cell;