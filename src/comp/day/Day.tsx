import React from "react";
import { isWeekend } from "../../util/util";
import { StyledDay, StyledDateNum } from "./Day.style";

export default function Day(props: any){
    const { dayInfo, colIndex, children } = props
    let dateNum = dayInfo?.date?.getDate() ?? '';

    return(
        <StyledDay isWeekend={isWeekend(colIndex)}>
            <StyledDateNum>{dateNum}</StyledDateNum>
            {children}
        </StyledDay>
    );
}