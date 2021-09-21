import Holidays from 'date-holidays';
import {
  DAY_SHORT_NAME,
  MONTH_NAME,
  MONTH_SHORT_NAME,
  TOTAL_COLUMN,
} from "./constant";

export interface MonthInfo {
  month: number; // 0 - 11
  firstDate: Date;
  lastDate: Date;
  numDay: number;
  shortName: string; // Jan
  name: string; // January
}

export interface DayInfo {
  date: Date;
  holiday?: string; // Queen birthday .etc
  note?: string;
}

export const getMonthInfo = (year: number, month: number): MonthInfo => {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  return {
    month,
    firstDate,
    lastDate,
    numDay: lastDate.getDate(),
    name: MONTH_NAME[month],
    shortName: MONTH_SHORT_NAME[month]
  };
};

export const getHeader = (): any => {
  const header = [];
  for (let i = 0; i < TOTAL_COLUMN - 1; i++) {
    header.push(DAY_SHORT_NAME[i % 7]);
  }

  return header;
};

export const getYearContent = (year: number): any[][] => {
  const aYear = [];
  let aMonth;
  let aDay;
  for (let i = 0; i < 12; i++) {
    aMonth = [];

    // get month info
    const monthInfo = getMonthInfo(year, i);

    // other days in month
    for (let j = 1; j <= monthInfo.numDay; j++) {
      aDay = new Date(year, i, j);
      if (i === 8 && j === 24) {
        aMonth.push({
          date: aDay,
          holiday: "AFL",
        });
      } else {
        aMonth.push({ date: aDay });
      }
    }

    aYear.push(aMonth);
  }

  addHoliday(aYear);

  return aYear;
};

export const getPlannerContent = (year: number) => {
  if (year < 1970 || year > 9999) {
    return;
  }

  return {
    header: getHeader(),
    content: getYearContent(year),
  };
};

export const isWeekend = (day: number) => {
  return Math.abs(day) % 7 === 5 || Math.abs(day) % 7 === 6;
};

export const addHoliday = (aYear: any[][]) => {
  const country = 'AU';
  const state = 'VIC';
  const hd = new Holidays(country, state);
  const holidays = hd.getHolidays();
  holidays.forEach((holiday, index) => {
    const aDate = new Date(holiday.date);
    const month = aDate.getMonth();
    const dateNum = aDate.getDate();
    aYear[month][dateNum - 1].holiday = holiday.name;
  });
  return aYear;
};

