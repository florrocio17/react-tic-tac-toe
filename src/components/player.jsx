import { useState } from "react";


export default function Player({initialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [ isEditing, setIsEditing] = useState(false);
  function handleEditClick(){
    //setIsEditing(!isEditing);
    setIsEditing(editing => !editing);
    console.log(isEditing,'ds');
    if (isEditing){
      onChangeName(symbol, playerName);
    }
  }
//   function handleEditClick(){
//     setIsEditing(prevEditing => {
//         console.log(prevEditing, 'first'); // Utiliza prevEditing para obtener el valor actual antes de la actualización
//         const newEditingState = !prevEditing; // Calcula el nuevo valor
//         console.log(newEditingState, 'second'); // Imprime el nuevo valor
//         if (newEditingState){
//           onChangeName(symbol, playerName);
//         }
//         return newEditingState; // Devuelve el nuevo valor para la actualización del estado
//     });
// }

  function handleChange(event) {
    console.log(event.target.value)
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing) [
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
  ]
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}  
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit" }</button>
          </li>
    )
}