// pages/AlarmDetailPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAlarmById } from '../services/alarmsApi';

function AlarmDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alarm, setAlarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try { 
        const data = await fetchAlarmById(id);
      setAlarm(Array.isArray(data) ? data[0] : data);
        console.log(alarm)
        
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
 console.log(alarm)
  if (loading) return <div>Загрузка...</div>;
  if (!alarm) return <div>Будильник не найден</div>;

const {text, time}  = alarm
  return (
    <div className=" max-w-6xl mx-auto min-h-screen p-6">
  <button 
    onClick={() => navigate(-1)} 
    className="mb-8 inline-flex  text-lg  hover:bg-blue-200  px-3 py-2 rounded-lg items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
  >
     Назад
  </button>
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Будильник #{id}</h1>
  <p className="text-gray-600 mb-2">Время: <span className="font-semibold text-gray-800">{time}</span></p>
  <p className="text-gray-600">Текст: <span className="font-semibold text-gray-800">{text}</span></p>
</div>
  );
}

export default AlarmDetailPage;