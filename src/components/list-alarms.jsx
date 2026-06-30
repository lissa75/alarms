import { useAlarms } from "../hooks/useAlarms";
import AlarmItem from "./alarm-item";
import { motion, AnimatePresence } from "framer-motion";
function ListAlarms() {
  const { alarms} = useAlarms()
  return (
    <div
      className="
      bg-white dark:bg-gray-900
      rounded-xl shadow-sm dark:shadow-gray-700
      p-6 transition-colors
    "
    >
      <h3
        className="
        text-xl font-bold mb-4
        text-gray-800 dark:text-gray-200
        transition-colors
      "
      >
        Список будильников
      </h3>

      {!alarms || alarms.length === 0 ? (
        <p
          className="
          text-gray-500 dark:text-gray-400
          text-center py-8 transition-colors
        "
        >
          Нет будильников
        </p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {alarms.map((alarm) => (
              <motion.div
                key={alarm.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1 }}
              >
                <AlarmItem
                  alarm={alarm}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default ListAlarms;
