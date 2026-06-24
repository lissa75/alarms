// pages/AlarmDetailPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAlarmById } from '../services/alarmsApi';

function AlarmDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alarm, setAlarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try { 
        setLoading(true);
        setError(null);
        
        const data = await fetchAlarmById(id);
        
        if (!data) {
          throw new Error('Будильник не найден');
        }
        
        setAlarm(Array.isArray(data) ? data[0] : data);
        
      } catch (err) {
        console.error('Ошибка загрузки будильника:', err);
        setError(err.message);
        
        throw err;
      } finally {
        setLoading(false);
      }
    };
    
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-600 dark:text-white">Загрузка</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 inline-flex text-lg hover:bg-blue-200 px-3 py-2 rounded-lg items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Назад
        </button>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-500 rounded p-4">
          <h3 className="text-red-600 dark:text-red-400 font-bold text-lg mb-2">Ошибка</h3>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!alarm) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 inline-flex text-lg hover:bg-blue-200 px-3 py-2 rounded-lg items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Назад
        </button>
        <div className="text-center text-gray-600 dark:text-white">
          Будильник не найден
        </div>
      </div>
    );
  }

  const { text, time } = alarm;
  
  return (
    <div className="max-w-6xl mx-auto min-h-screen p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 inline-flex text-lg hover:bg-blue-200 px-3 py-2 rounded-lg items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        Назад
      </button>
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold dark:text-white text-gray-800 mb-4">
          Будильник #{id}
        </h1>
        
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Время: <span className="font-semibold dark:text-white text-gray-800">{time}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Текст: <span className="font-semibold dark:text-white text-gray-800">{text}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AlarmDetailPage;