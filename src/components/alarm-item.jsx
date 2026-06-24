import Modal from "./changeAlarm";
import { useState} from 'react';

const API_SERVER = import.meta.env.VITE_API_SERVER; 

function AlarmItem({ alarm, onDelete}) {
   const [isOpen, setIsOpen] = useState(false)
   const onToogle=()=>{
  setIsOpen(!isOpen)
}

  const [alarms, setAlarm]= useState({
      time: alarm.time,
      text: alarm.text
    });
 
const handleAddAlarm =(e)=>{
  const {name, value} = e.target
  setAlarm(prev=>({
    ...prev,
    [name]: value
  }))}

 const onSubmit = async ( id) => { 
    try { 
      const response = await fetch(`${API_SERVER}/${id}`, {
        method: 'PUT',
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
        throw new Error('Ошибка при сохранении ');
      }

    } catch (error) {
       alert('Ошибка: ' + error.message);
    }}
    
const {text, time} = alarms
  return (
    <div>
      <div>
        <div>{alarm.time} - {alarm.text}</div>
        <button onClick={() => onDelete(alarm.id)}>Удалить</button>
        <button onClick={onToogle}> open modal</button>
      </div>
       <Modal 
       isOpen={isOpen} 
       onToogle = {onToogle}
       >
      <form onSubmit={()=>onSubmit(alarm.id)} >
          <input 
         
            type="time" 
            name="time" 
            value={time} 
            onChange={handleAddAlarm}
          />
          <input 
        
            type="text" 
            placeholder="Текст" 
            name="text" 
            value={text} 
            onChange={handleAddAlarm}
          />
          <button type="submit" >сохранить
          </button>
        </form>
    </Modal>
    </div>
  );
}

export default AlarmItem;