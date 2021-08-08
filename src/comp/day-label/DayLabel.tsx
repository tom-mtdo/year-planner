import React from "react";
import { isWeekend } from "../../util/util";
import { StlyedDayLabel } from "./DayLabel.style";

export default function DayLabel(props: any){
    const { colIndex, children } = props

    return(
        <StlyedDayLabel isWeekend={isWeekend(colIndex)}>
            {children}
        </StlyedDayLabel>
    );
}