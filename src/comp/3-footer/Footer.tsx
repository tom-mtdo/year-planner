import React from "react";
import Box from "../../lib/box/Box";
import { StyledP } from '../comp.style';
import { StyledInfo, StyledNote } from "./Footer.style";

export default function Footer(){
    return(
        <Box>
            <StyledNote>* Double click on a day to add notes</StyledNote>
            <StyledInfo>Version: 1.0.0 Beta 1</StyledInfo>
            <StyledP>Copyright HTD Pty Ltd</StyledP>
        </Box>
    );
}