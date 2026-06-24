// client/src/App.js
import { useState, useEffect} from 'react';
import CreateAlarm from './components/create-alarm';
import ListAlarms from './components/list-alarms';

import {deleteAlarm, fetchAlarms, onEdit, onSubmit} from './services/alarmsApi';

function App() {

  const [alarms, setAlarms] = useState([]); 
    const handleAddAlarm = async(data) => {
        const newAlarm=  await onSubmit(data)
      if(newAlarm && newAlarm.id){
    setAlarms(prev => [...prev, newAlarm]);
      }
 
  };

  useEffect(() => {
    const loadAlarms= async()=>{
    const data = await fetchAlarms()  
    setAlarms(data); 
 }
 loadAlarms()
  }, []);

const handleDelete =async(id)=>{
  await deleteAlarm(id)
   setAlarms(prev => prev.filter(alarm => alarm.id !== id)); 
}
const updateAlarm = async(id, updateData) => {
  const result = await onEdit(id, updateData);
  if (result && result !== "ошибка") {
      const freshData = await fetchAlarms();
      if (freshData) {
          setAlarms(freshData);
      }
  }
}

  return (
    <div className="App">
      <CreateAlarm onAddItem={handleAddAlarm} />
    <ListAlarms 
    alarms={alarms}  onDelete = {handleDelete}
    onUpdate = {updateAlarm}/>
  

    </div>
  );
}

export default App;