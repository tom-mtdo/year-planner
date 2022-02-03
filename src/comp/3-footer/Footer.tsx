import React from "react";
import Box from "../../lib/box/Box";
import { StyledP } from '../comp.style';
import { StyledNote } from "./Footer.style";

export default function Footer(){
    return(
        <Box>
            <StyledNote>* Double click on a day to add note</StyledNote>
            <StyledP>Copyright TOMTECH Pty Ltd</StyledP>
        </Box>
    );
}