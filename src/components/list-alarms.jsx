
import AlarmItem from "./alarm-item";


function ListAlarms({alarms, onDelete, onUpdate}) {
  
 return (
  <div>
    <h3>Список будильников:</h3>
    {!alarms || alarms.length === 0 ? (
      <p>Нет будильников</p>
    ) : (
      alarms.map((alarm, index) => {
        return (
          <AlarmItem
            key={alarm.id || index}
            alarm={alarm}
            onDelete = {onDelete}
            onUpdate = {onUpdate}
          />
        );
      })
    )}
  </div>
);
}

export default ListAlarms;