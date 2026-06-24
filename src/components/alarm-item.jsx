import Modal from "./changeAlarm";
import { useState, useEffect} from 'react';

function AlarmItem({ alarm, onDelete, onUpdate}) {
   const [isOpen, setIsOpen] = useState(false)

   const onToogle=()=>{
  setIsOpen(!isOpen)
}

  const [formData, setformData]= useState({
      time: alarm.time,
      text: alarm.text
    });

  useEffect(() => {
    setformData({
      time: alarm.time,
      text: alarm.text
    });
  }, [alarm]);

const handleAddAlarm =(e)=>{
  const {name, value} = e.target
  setformData(prev=>({
    ...prev,
    [name]: value
  }))}

 const handleSubmit = async(e)=>{
  e.preventDefault()
    const updateData = {
      time: formData.time,
      text: formData.text,
    };
 
  await onUpdate(alarm.id, updateData)
  setIsOpen(false)
 }
 

    
const {text, time} = formData
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
      <form onSubmit={handleSubmit} >
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