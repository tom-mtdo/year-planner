import React from "react";
import { StlyedDayLabel } from "./DayLabel.style";

export default function DayLabel(props: any){
    const { children } = props
    return(
        <StlyedDayLabel>
            {children}
        </StlyedDayLabel>
    );
}