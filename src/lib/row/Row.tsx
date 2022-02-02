import React from "react";
import { StyledRow } from "./Row.style";

export default function Box(props: any){
    const { children, minHeight } = props;
    return(
        <StyledRow minHeight={minHeight}>
            {children}
        </StyledRow>
    );
}