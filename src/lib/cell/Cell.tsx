import React from "react";
import { StyledCell } from "./Cell.style";

export default function Box(props: any){
    const { children, border } = props;
    return(
        <StyledCell border={border}>
            {children}
        </StyledCell>
    );
}