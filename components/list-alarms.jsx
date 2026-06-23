
import AlarmItem from "./alarm-item";

function ListAlarms({deleteAl, alarms}) {
 return (
  <div>
    <h3>Список будильников:</h3>
    {!alarms || alarms.length === 0 ? (
      <p>Нет будильников</p>
    ) : (
      alarms.map((alarm, index) => {
        console.log(`📝 Рендер alarm #${index}:`, alarm);
        console.log(`📝 alarm.id:`, alarm.id);
        return (
          <AlarmItem
            key={alarm.id || index}
            alarm={alarm}
            onDelete={deleteAl}
          />
        );
      })
    )}
  </div>
);
}

export default ListAlarms;