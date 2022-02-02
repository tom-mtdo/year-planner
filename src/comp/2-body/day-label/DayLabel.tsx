import React from "react";
import { isWeekend } from "../../../util/util";
import { StlyedDayLabel } from "./DayLabel.style";

export default function DayLabel(props: any){
    const { colIndex, children } = props
    const isVoid = colIndex < 0;

    return(
        <StlyedDayLabel isWeekend={isWeekend(colIndex)} isVoid={isVoid}>
            {children}
        </StlyedDayLabel>
    );
}