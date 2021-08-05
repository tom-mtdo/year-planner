import React from "react";
import { StyledWeekend, StyledDateNum } from "./Weekend.style";

export default function Weekend(props: any){
    const { children, dateNum } = props
    return(
        <StyledWeekend>
            <StyledDateNum>{dateNum}</StyledDateNum>
            {children}
        </StyledWeekend>
    );
}