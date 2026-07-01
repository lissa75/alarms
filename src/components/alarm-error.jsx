import {useAlarmsStore} from '../store/alarmStore'
function AlarmError() {
  const error = useAlarmsStore(state=>state.error)
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }
  return null;
}
export default AlarmError;
