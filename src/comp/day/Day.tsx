import React from "react";
import { StyledDay, StyledDateNum } from "./Day.style";

export default function Day(props: any){
    const { children, dateNum } = props
    return(
        <StyledDay>
            <StyledDateNum>{dateNum}</StyledDateNum>
            {children}
        </StyledDay>
    );
}