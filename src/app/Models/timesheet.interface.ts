export interface Timesheet {
  hours: number;
  date: Date;
  category: string;
}

export interface Period {
  timeslots: Timesheet[];
  finished: boolean;
  month: number;
  year: number;
}
