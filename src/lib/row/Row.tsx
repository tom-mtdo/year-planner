import React from "react";
import { StyledRow } from "./Row.style";

export default function Box(props: any){
    const { children } = props;
    return(
        <StyledRow>
            {children}
        </StyledRow>
    );
}