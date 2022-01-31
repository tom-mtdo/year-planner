import React from "react";
import { StlyedMonthLabel } from "./MonthLabel.style";

export default function MonthLabel(props: any){
    const { children } = props
    return(
        <StlyedMonthLabel>
            {children}
        </StlyedMonthLabel>
    );
}