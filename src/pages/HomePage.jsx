import CreateAlarm from "../components/create-alarm";
import ListAlarms from "../components/list-alarms";

function HomePage({ alarms, handleAddAlarm, handleDelete, updateAlarm }) {
  return (
    <div className="max-w-6xl mx-auto">
      <CreateAlarm onAddItem={handleAddAlarm} />
      <ListAlarms
        alarms={alarms}
        onDelete={handleDelete}
        onUpdate={updateAlarm}
      />
    </div>
  );
}
export default HomePage;
