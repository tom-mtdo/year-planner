import React from "react";
// import { isWeekend } from '../../util/util';
import { StyledDay, StyledDateNum } from "./Day.style";

export default function Day(props: any){
    const { dayInfo, colIndex, isCurrent, children } = props
    let dateNum = dayInfo?.date?.getDate() ?? '';
    const isVoid = !dayInfo?.date;
    const isHoliday = Boolean(dayInfo.description);
    const day = dayInfo?.date?.getDay() ?? 0;
    const isWeekend = day % 7 === 6 || day % 7 === 0;

    return(
        <StyledDay isWeekend={isWeekend} isCurrent={isCurrent} isVoid={isVoid} isHoliday={isHoliday}>
            <StyledDateNum>{dateNum}</StyledDateNum>
            {children}
        </StyledDay>
    );
}