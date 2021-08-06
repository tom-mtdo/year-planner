import React from "react";
import { StyledDay, StyledDateNum } from "./Day.style";

export default function Day(props: any){
    const { dayInfo, colIndex, children } = props
    const isWeekend = colIndex % 7 === 5 || colIndex % 7 === 6;
    let dateNum = dayInfo?.date?.getDate();
    
    // this if block is temp
    if (!Boolean(dateNum) && !Boolean(children)) {
        dateNum = '-';
    }

    return(
        <StyledDay isWeekend={isWeekend}>
            <StyledDateNum>{dateNum}</StyledDateNum>
            {children}
        </StyledDay>
    );
}