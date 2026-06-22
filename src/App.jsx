// client/src/App.js
import { useState } from 'react';
import CreateAlarm from '../components/create-alarm';


function App() {
  const [alarms, setAlarms] = useState([]);

  const handleAddAlarm = async (newAlarm) => {
    
    setAlarms(prev => [...prev, newAlarm]);
  };
const deleteAl = async (id) => {
  try {
    
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

   
    if (!response.ok) {
      throw new Error('Ошибка при удалении');
    }


    const data = await response.json();
    console.log('Удалено:', data);

  
    setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== id));
    

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Не удалось удалить будильник');
  }
};

  return (
    <div className="App">
      <CreateAlarm onAddItem={handleAddAlarm} />
      
      <div>
        <h3>Список будильников:</h3>
        {alarms.length === 0 ? (
          <p>Нет будильников</p>
        ) : (
          alarms.map(alarm => (
            <div key={alarm.id}>
              {alarm.time} - {alarm.text}
               <br />
              <button onClick={() => deleteAl(alarm.id)}>Удалить</button>
               <button>Изменить</button>
            </div>
             
          ))
        )}
      </div>
    </div>
  );
}

export default App;