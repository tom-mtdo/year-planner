import React from "react";
import { DayInfo } from "../../util/util";
// import { isWeekend, DayInfo } from '../../util/util';
import { StyledDay, StyledDateNum, StyledNote, StyledHoliday } from "./Day.style";

export interface IDay {
    dayInfo?: DayInfo | undefined;
    isCurrent?: boolean;
    children?: any;
}

export default function Day(props: IDay){
    const { dayInfo, isCurrent, children } = props
    let dateNum = dayInfo?.date?.getDate() ?? '';
    const isVoid = !dayInfo?.date;
    const isHoliday = Boolean(dayInfo?.holiday);
    const day = dayInfo?.date?.getDay() ?? 0;
    const isWeekend = day % 7 === 6 || day % 7 === 0;

    return(
        <StyledDay isWeekend={isWeekend} isCurrent={isCurrent ?? false} isVoid={isVoid} isHoliday={isHoliday}>
            <StyledDateNum>{dateNum}</StyledDateNum>
            <StyledNote>{dayInfo?.description}</StyledNote>
            {children}
            <StyledHoliday>{dayInfo?.holiday}</StyledHoliday>
        </StyledDay>
    );
}