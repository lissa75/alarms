import { http, HttpResponse } from "msw";
import { CreateAlarm, UpdateAlarm  } from "./types";

const BASE = import.meta.env.VITE_API_SERVER
const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

let mockAlarms = [
  { id: 1, time: "08:00", text: "Утренняя пробежка" },
  { id: 2, time: "12:30", text: "Обед" },
  { id: 3, time: "18:00", text: "Тренировка" },
];
export const handlers = [
  http.get(`${BASE}${ENDPOINT}`, async () => {
    return HttpResponse.json(mockAlarms, { status: 200 });
  }),
  http.get(`${BASE}${ENDPOINT}/:id`, async ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      mockAlarms.find((m) => m.id === Number(id)),
      { status: 200 },
    );
  }),
  http.delete(`${BASE}${ENDPOINT}/:id`, async ({ params }) => {
    const { id } = params;
    const deleteAlarm = mockAlarms.findIndex((m) => m.id === Number(id));
    if (deleteAlarm != -1) {
      mockAlarms.splice(deleteAlarm, 1);
    }
    return HttpResponse.json(mockAlarms, { status: 200 });
  }),
  http.put(`${BASE}${ENDPOINT}/:id`, async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as UpdateAlarm;
    const alarmIndex = mockAlarms.findIndex((m) => m.id === Number(id));
    mockAlarms[alarmIndex] = { ...mockAlarms[alarmIndex], ...body };

    return HttpResponse.json(mockAlarms[alarmIndex], { status: 200 });
  }),

  http.post(`${BASE}${ENDPOINT}`, async ({ request }) => {
    const body = (await request.json()) as CreateAlarm;
    const { time, text } = body;

    if (time === "" || text === "") {
      return HttpResponse.json(
        { error: "Заполните все поля" },
        { status: 400 },
      );
    }
    const newAlarm = {
      id: mockAlarms.length + 1,
      time,
      text,
    };
    mockAlarms.push(newAlarm);
    return HttpResponse.json(newAlarm, { status: 200 });
  }),
];
