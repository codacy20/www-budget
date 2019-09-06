export interface Timesheet {
  hour: number;
  date: Date;
  category: string;
}

export interface Period {
  hours: Timesheet[];
  finished: boolean;
  start: Date;
  end: Date;
}
