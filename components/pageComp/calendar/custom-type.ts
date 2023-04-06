export interface ICalendar {
    id: string;
    name: string;
    color: string;
    bgColor?: string;
}

export interface ICalendarSchedule {
    id: string; // string number ex. "0", "1"...
    calendarId: string;
    title: string;
    body: string;
    start: string; // date string
    end: string; // date string
    isAllday: boolean;
}
