import React from "react";
import { StyledCopyRight, StyledFooter, StyledInfo, StyledNote } from "./Footer.style";

export default function Footer(){
    return(
        <StyledFooter>
            <StyledNote>* Double click on a day to add notes</StyledNote>
            <StyledCopyRight>Copyright HTD Pty Ltd</StyledCopyRight>
            <StyledInfo>Version: 1.0.0 Beta 1</StyledInfo>
        </StyledFooter>
    );
}