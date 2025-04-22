export default function NewGame({icon, newGame}) {

    return (
        <button className='bg-transparent border-0' onClick={newGame}>{icon}</button>
    )
}