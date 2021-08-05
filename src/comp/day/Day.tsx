import React from "react";
import { StlyedDay } from "./Day.style";

export default function Day(props: any){
    const { children } = props
    return(
        <StlyedDay>
            {children}
        </StlyedDay>
    );
}