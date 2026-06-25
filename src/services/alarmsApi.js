const API_SERVER = import.meta.env.VITE_API_SERVER;
export const fetchAlarms = async () => {
  const response = await fetch(API_SERVER, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки");
  }
  const data = await response.json();
  return data;
};
// services/alarmsApi.js
export const fetchAlarmById = async (id) => {
  const response = await fetch(`${API_SERVER}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const onSubmit = async (data) => {
  const { time, text } = data;

  if (time === "" || text === "") {
    alert("Заполните все поля");
    return null;
  }
  const response = await fetch(API_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: time,
      text: text,
    }),
  });
  if (!response.ok) {
    throw new Error("Ошибка при создании ");
  }
  const newAlarm = await response.json();
  return newAlarm;
};

export const deleteAlarm = async (id) => {
  const response = await fetch(`${API_SERVER}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Ошибка при удалении");
  }
  const data = await response.json();
  console.log("Удалено:", data);
  return data;
};

export const onEdit = async (id, updateData) => {
  const response = await fetch(`${API_SERVER}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error("Ошибка при сохранении ");
  }
  const data = await response.json();
  return data;
};
