import React from "react";
import { isWeekend } from "../../util/util";
import { StyledDay, StyledDateNum } from "./Day.style";

export default function Day(props: any){
    const { dayInfo, colIndex, isCurrent, children } = props
    let dateNum = dayInfo?.date?.getDate() ?? '';
    const isVoid = !dayInfo?.date;
    const isHoliday = Boolean(dayInfo.description);

    return(
        <StyledDay isWeekend={isWeekend(colIndex)} isCurrent={isCurrent} isVoid={isVoid} isHoliday={isHoliday}>
            <StyledDateNum>{dateNum}</StyledDateNum>
            {children}
        </StyledDay>
    );
}