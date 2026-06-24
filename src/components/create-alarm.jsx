// client/src/components/CreateAlarm.js
import { useAlarmForm } from "../hooks/useAlarmForm";

function CreateAlarm ({onAddItem }){

const {handleSubmit, handleAddAlarm, alarms} = useAlarmForm(onAddItem)
    return (
      <div>
        <h2>Создать будильник</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="time" 
            name="time" 
            value={alarms.time} 
            onChange={handleAddAlarm}
          />
          <input 
            type="text" 
            placeholder="Текст" 
            name="text" 
            value={alarms.text} 
            onChange={handleAddAlarm}
          />
          <button type="submit" >Добавить
          </button>
        </form>
      </div>)
  }
export default CreateAlarm;