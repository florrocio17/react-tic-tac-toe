export default function Log ({turns}) {
    return (
        <ol id='log'>
            {/* we want to show which player selected which square.  we should add a key here
            because you should always do that when outputting a dynamic list.*/}
            {turns.map((turn) => 
                (<li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row} , {turn.square.col}
                </li>))}
        </ol>
    )
}