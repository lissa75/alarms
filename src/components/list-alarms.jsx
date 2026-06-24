import AlarmItem from "./alarm-item";

function ListAlarms({alarms, onDelete, onUpdate}) {
  
  return (
    <div className="
      bg-white dark:bg-gray-900
      rounded-xl shadow-sm dark:shadow-gray-700
      p-6 transition-colors
    ">
      <h3 className="
        text-xl font-bold mb-4
        text-gray-800 dark:text-gray-200
        transition-colors
      ">
        Список будильников:
      </h3>
      
      {!alarms || alarms.length === 0 ? (
        <p className="
          text-gray-500 dark:text-gray-400
          text-center py-8 transition-colors
        ">
          Нет будильников
        </p>
      ) : (
        <div className="space-y-3">
          {alarms.map((alarm) => {
            return (
              <AlarmItem 
                key={alarm.id}
                alarm={alarm}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ListAlarms;