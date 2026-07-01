import { useAlarmsUI } from "../hooks/useAlarmsUI";
function AlarmLoading() {
  const { isLoading } = useAlarmsUI();
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
