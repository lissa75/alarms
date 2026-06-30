import Modal from "./changeAlarm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AlarmItem({ alarm, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setformData] = useState({
    time: alarm.time,
    text: alarm.text,
  });

  useEffect(() => {
    setformData({
      time: alarm.time,
      text: alarm.text,
    });
  }, [alarm]);

  const handleEditAlarm = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      time: formData.time,
      text: formData.text,
    };

    await onUpdate(alarm.id, updateData);
    setIsOpen(false);
  };

  const { text, time } = formData;
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg 
             border border-gray-100 dark:border-gray-700
             p-4 mb-3 cursor-pointer 
             hover:bg-gray-50 dark:hover:bg-gray-600 
             transition-all"
      onClick={() => navigate(`/${alarm.id}`)}
    >
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between "
        >
          <div className="text-gray-800  dark:text-white font-medium ">
            {alarm.time} - {alarm.text}
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(alarm.id);
              }}
              className="bg-gray-400 hover:bg-gray-500  text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Удалить
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Редактировать
            </button>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onToggle={onToggle}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="time"
            name="time"
            value={time}
            onChange={handleEditAlarm}
            className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
          />
          <input
            type="text"
            placeholder="Текст"
            name="text"
            value={text}
            onChange={handleEditAlarm}
            className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 dark:hover:bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            сохранить
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AlarmItem;
