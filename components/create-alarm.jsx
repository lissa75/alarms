// client/src/components/CreateAlarm.js
import { useState } from "react";

function CreateAlarm (){
  const [alarm, setAlarm]= useState({
      time: "",
      text: ""
    });
 
const handleAddAlarm =(e)=>{
  const {name, value} = e.target
  setAlarm(prev=>({
    ...prev,
    [name]: value
  }))
}
 const onSubmit = async (e) => {
  const{time, text }= alarm
    e.preventDefault()   
    if (time === '' || text === '') {
      alert('Заполните все поля');
      return;
    }
    try { 
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: time,
          text: text
        })
        
      }
    );
      if (!response.ok) {
        throw new Error('Ошибка при создании будильника');
      }
       alert("успех");
      setAlarm({ time: '', text: '' });
    } catch (error) {
       alert('Ошибка: ' + error.message);
    }}

    return (
      
      <div>
        <h2>Создать будильник</h2>
        <form onSubmit={onSubmit}>
          <input 
            type="time" 
            name="time" 
            value={alarm.time} 
            onChange={handleAddAlarm}
          />
          <input 
            type="text" 
            placeholder="Текст" 
            name="text" 
            value={alarm.text} 
            onChange={handleAddAlarm}
          />
          <button type="submit" >Добавить
          </button>
        </form>
      </div>)
  }
export default CreateAlarm;