import { getUserId } from "../utils/getUserId";

const API_SERVER = import.meta.env.VITE_API_SERVER;
const ALARMS_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetchAlarms = async () => {
  const response = await fetch(`${API_SERVER}${ALARMS_ENDPOINT}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "X-User-Id": getUserId() },
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки");
  }
  const data = await response.json();
  return data;
};

export const fetchAlarmById = async (id) => {
  const response = await fetch(`${API_SERVER}${ALARMS_ENDPOINT}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "X-User-Id": getUserId() },
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
  const response = await fetch(`${API_SERVER}${ALARMS_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": getUserId() },
    body: JSON.stringify({
      time: time,
      text: text,
    }),
  });
  if (!response.ok) {
    throw new Error("Ошибка при создании");
  }
  const newAlarm = await response.json();
  return newAlarm;
};

export const deleteAlarm = async (id) => {
  const response = await fetch(`${API_SERVER}${ALARMS_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "X-User-Id": getUserId() },
  });
  if (!response.ok) {
    throw new Error("Ошибка при удалении");
  }
  const data = await response.json();
  console.log("Удалено:", data);
  return data;
};

export const onEdit = async (id, updateData) => {
  const response = await fetch(`${API_SERVER}${ALARMS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-User-Id": getUserId() },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error("Ошибка при сохранении");
  }
  const data = await response.json();
  return data;
};
