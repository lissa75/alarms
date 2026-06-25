import { param } from "express/lib/application";
import { http, HttpResponse } from "msw";
import { useParams } from "react-router-dom";
import { Alarm, CreateAlarm, UpdateAlarm } from './types'
let mockAlarms = [
  { id: 1, time: "08:00", text: "Утренняя пробежка" },
  { id: 2, time: "12:30", text: "Обед" },
  { id: 3, time: "18:00", text: "Тренировка" },
];
export const handlers = [
  http.get(`/api/alarms`, async () => {
    return HttpResponse.json(mockAlarms, { status: 200 });
  }),
  http.get(`/api/alarms/:id`, async ({ params }) => {
    const { id } = params;
    return HttpResponse.json(mockAlarms.find((m) => m.id === Number(id)), { status: 200 });
  }),
  http.delete(`/api/alarms/:id`, async ({ params }) => {
    const { id } = params;
    const deleteAlarm = mockAlarms.findIndex((m) => m.id === Number(id));
    if (deleteAlarm !=-1) {
      mockAlarms.splice(1, Number(id));
    }
    return HttpResponse.json(mockAlarms, { status: 200 });
  }),
  http.put('/api/alarms/:id', async ({ request , params}) => {
    const { id } = params;
    const body = (await request.json()) as UpdateAlarm
    const alarmIndex =mockAlarms.findIndex((m) => m.id === Number(id))
    mockAlarms[alarmIndex] = {...mockAlarms[alarmIndex], ...body}

     return HttpResponse.json(mockAlarms[alarmIndex], { status: 200 });
  }),

  http.post(`/api/alarms`, async ({ request}) => {
   const body = (await request.json()) as CreateAlarm
     const { time, text } = body

  if (time === "" || text === "") {
   { error: "Заполните все поля" }
    { status: 400 }
  }
 const  newAlarm = {
    id: mockAlarms.length + 1,
    time,
    text,
  }
  mockAlarms.push(newAlarm)
     return HttpResponse.json(newAlarm, { status: 200 });
  }),

  
];
