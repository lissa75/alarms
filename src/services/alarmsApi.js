 
 const API_SERVER = import.meta.env.VITE_API_SERVER; 
  export const fetchAlarms = async () => {
    try {
      const response = await fetch(API_SERVER, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }
      const data = await response.json()
      return data
    } catch (error) {
      alert('Ошибка: ' + error.message);
       return null
    }
  };
// services/alarmsApi.js
export const fetchAlarmById = async (id) => {
  try {
    const response = await fetch(`${API_SERVER}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();
    console.log('API вернул:', data); // Отладочный вывод
    return data;
    
  } catch (error) {
    console.error('Ошибка в fetchAlarmById:', error.message);
  }
};
 export const onSubmit = async ( data) => {
  const{time, text }= data
    
    if (time === '' || text === '') {
      alert('Заполните все поля');
     return null 
    }
    try { 
      const response = await fetch(API_SERVER, {
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
      const newAlarm = await response.json()
       console.log(newAlarm)
     return newAlarm
    
    } catch (error) {
       alert('Ошибка: ' + error.message);
       return null
    }}

 export const deleteAlarm = async (id) => {
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
      return data
     
    } catch (error) {
      console.error('Ошибка:', error.message);
      alert('Не удалось удалить будильник');
      return null
    }
   
 }

 export const onEdit = async ( id, updateData) => { 
    try { 
      const response = await fetch(`${API_SERVER}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
        
      }
    );   
      if (!response.ok) {
        throw new Error('Ошибка при сохранении ');
      }
     const data = await response.json();
      return data
    } catch (error) {
       alert('Ошибка: ' + error.message);
       return "ошибка"
    }}
