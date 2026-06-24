// client/src/App.js
import { useState, useEffect} from 'react';
import CreateAlarm from './components/create-alarm';
import ListAlarms from './components/list-alarms';

const API_SERVER = import.meta.env.VITE_API_SERVER; 
function App() {

  const [alarms, setAlarms] = useState([]); 
 
  const deleteAl = async (id) => {
    try {
      const response = await fetch(`${API_SERVER}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении');
      }
      const data = await response.json();
      console.log('Удалено:', data);
      setAlarms(prev => prev.filter(alarm => alarm.id !== id)); 
    } catch (error) {
      console.error('Ошибка:', error.message);
      alert('Не удалось удалить будильник');
    }
  };

  const fetchAlarms = async () => {
    try {
      const response = await fetch(API_SERVER, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }
      const data = await response.json();
       
      setAlarms(data); 
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };
    const handleAddAlarm = (newAlarm) => {
    setAlarms(prev => [...prev, newAlarm]);
  };
  
  useEffect(() => {
    fetchAlarms();
  }, []);



  return (
    <div className="App">
      <CreateAlarm onAddItem={handleAddAlarm} />
    <ListAlarms 
    deleteAl = {deleteAl}
  
    alarms={alarms}/>
   

    </div>
  );
}

export default App;