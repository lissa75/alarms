
export interface Alarm {
  id: number;
  time: string;
  text: string;
}

export interface CreateAlarm {
  time: string;
  text: string;
}

export interface UpdateAlarm {
  time?: string;
  text?: string;
}
