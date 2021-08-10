import React from "react";
import { BodyBox } from "./Body.style";
import BodyLeft from '../body-left/BodyLeft';
import BodyRight from '../body-right/BodyRight';
import BodyCenter from '../body-center/BodyCenter';

export default function Body(){
    return(
        <BodyBox>
            <BodyLeft />
            <BodyCenter />
            <BodyRight />
        </BodyBox>
    );
}