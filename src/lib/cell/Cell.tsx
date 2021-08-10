import React from "react";
import { StyledCell } from "./Cell.style";

export default function Box(props: any){
    const { children, border, minWidth } = props;
    return(
        <StyledCell border={border} minWidth={minWidth}>
            {children}
        </StyledCell>
    );
}