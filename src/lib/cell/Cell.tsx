import React from "react";
import { StyledCell } from "./Cell.style";

export default function Box(props: any){
    const { children } = props;
    return(
        <StyledCell>
            {children}
        </StyledCell>
    );
}