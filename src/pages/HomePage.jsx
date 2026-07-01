import { useEffect } from "react";
import CreateAlarm from "../components/create-alarm";
import ListAlarms from "../components/list-alarms";
import { useAlarmsStore } from "../store/alarmStore";

function HomePage() {
  const loadAlarms = useAlarmsStore((state) => state.loadAlarms);
  useEffect(() => {
    loadAlarms();
  }, [loadAlarms]);
  return (
    <div className="max-w-6xl mx-auto">
      <CreateAlarm />
      <ListAlarms />
    </div>
  );
}
export default HomePage;
