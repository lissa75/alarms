import { useAlarmsStore } from "../store/alarmStore";

function AlarmLoading() {
  const  isLoading  = useAlarmsStore(state=>state.isLoading);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Загрузка...</p>
      </div>
    );
  }
  return null;
}
export default AlarmLoading;
