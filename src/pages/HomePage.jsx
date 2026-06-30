import CreateAlarm from "../components/create-alarm";
import ListAlarms from "../components/list-alarms";

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <CreateAlarm />
      <ListAlarms />
    </div>
  );
}
export default HomePage;
