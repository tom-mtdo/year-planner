import React from "react";
import { StyledBox } from "./Box.style";

export default function Box(props: any){
    const { children } = props;
    return(
        <StyledBox>
            {children}
        </StyledBox>
    );
}