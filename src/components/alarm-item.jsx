function AlarmItem({ alarm, onDelete }) {
  return (
    <div>
      <div>{alarm.time} - {alarm.text}</div>
      <button onClick={() => onDelete(alarm.id)}>Удалить</button>
      <button>Изменить</button>
    </div>
  );
}

export default AlarmItem;