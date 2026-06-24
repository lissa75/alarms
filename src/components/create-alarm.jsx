// client/src/components/CreateAlarm.js
import { useState } from "react";

function CreateAlarm ({onAddItem}){
  const [alarms, setAlarm]= useState({
      time: "",
      text: ""
    });
const handleAddAlarm =(e)=>{
  const {name, value} = e.target
  setAlarm(prev=>({
    ...prev,
    [name]: value
  }))}
     const handleSubmit = async(e)=>{
  e.preventDefault()
    const data = {
      time: alarms.time,
      text: alarms.text,
    };
  await onAddItem( data)
   setAlarm({ time: '', text: '' });
}
    return (
      
      <div>
        <h2>Создать будильник</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="time" 
            name="time" 
            value={alarms.time} 
            onChange={handleAddAlarm}
          />
          <input 
            type="text" 
            placeholder="Текст" 
            name="text" 
            value={alarms.text} 
            onChange={handleAddAlarm}
          />
          <button type="submit" >Добавить
          </button>
        </form>
      </div>)
  }
export default CreateAlarm;