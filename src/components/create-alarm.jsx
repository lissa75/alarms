// client/src/components/CreateAlarm.js
import { useAlarmForm } from "../hooks/useAlarmForm";

function CreateAlarm ({onAddItem }){

const {handleSubmit, handleAddAlarm, alarms} = useAlarmForm(onAddItem)
    return (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-8 transition-colors">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Создать будильник</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input 
      type="time" 
      name="time" 
      value={alarms.time} 
      onChange={handleAddAlarm}
      className="w-full px-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg 
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                 focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
    />
    <input 
      type="text" 
      placeholder="Текст" 
      name="text" 
      value={alarms.text} 
      onChange={handleAddAlarm}
      className="w-full px-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg 
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
    />
    <button 
      type="submit" 
      className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 
                 text-white font-semibold py-4 px-4 rounded-lg transition-colors"
    >
      Добавить
    </button>
  </form>
</div>)
  }
export default CreateAlarm;