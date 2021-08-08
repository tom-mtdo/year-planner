import { DAY_SHORT_NAME, MONTH_NAME, MONTH_SHORT_NAME, TOTAL_COLUMN } from "./constant";

export interface MonthInfo {
    month: number; // 0 - 11
    firstDate: Date;
    lastDate: Date;
    numDay: number;
    shortName: string; // Jan
    name: string; // January
    leftIndent: number; // indent when display depend on which day is the first date, Mon | Tue ...
}

export interface DayInfo {
    date: Date;
    holiday?: string; // Queen birthday .etc
    description?: string;
}

export const getMonthInfo = (year: number, month: number): MonthInfo => {
    const firstDate = new Date(year, month, 1  );
    const firstDay = firstDate.getDay();
    const leftIndent = firstDay === 0 ? 6 : firstDay - 1;
    const lastDate = new Date(year, month + 1, 0);

    return({
        month,
        firstDate,
        lastDate,
        numDay: lastDate.getDate(),
        name: MONTH_NAME[month],
        shortName: MONTH_SHORT_NAME[month],
        leftIndent
    })
};

export const getHeader = (): any => {
    const header = [];
    for(let i=0; i < TOTAL_COLUMN - 1; i++) {
        header.push(DAY_SHORT_NAME[i % 7]);
    };

    return header;
}

export const getYearContent = (year: number): any[][] => {
    const aYear = [];
    let aMonth;
    let aDay;
    for(let i=0; i<12; i++) {
        aMonth = [];
        
        // get month info
        const monthInfo = getMonthInfo(year, i);

        // indent - left padding
        for(let j=1; j<=monthInfo.leftIndent; j++) {
            aMonth.push('-')
        };

        // other days in month
        for(let j=1; j<=monthInfo.numDay; j++) {
            aDay = new Date(year, i, j);
            aMonth.push({date: aDay});
        };

        // the rear padding
        const restNum = TOTAL_COLUMN - 1 - monthInfo.leftIndent - monthInfo.numDay;
        for(let j=0; j<restNum ; j++) {
            aMonth.push('-')
        };
        aYear.push(aMonth);
    };

    return aYear;
}

export const getPlannerContent = (year: number) => {
    if (year < 1970 || year > 9999) { return; }

    return ({
        header: getHeader(),
        content: getYearContent(year)
    })
}

export const isWeekend = (day: number) => {
    return (day % 7 === 5 || day % 7 === 6);
}