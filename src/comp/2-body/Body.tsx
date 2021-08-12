import React from "react";
import { BodyBox, BodyLeftBox, BodyCenterBox, BodyRightBox } from "./Body.style";
import PlannerContent from '../planner/Planner';

export default function Body() {
  return (
    <BodyBox>
      <BodyLeftBox>
        <p>Left</p>
      </BodyLeftBox>
      <BodyCenterBox>
        <PlannerContent />
      </BodyCenterBox>
      <BodyRightBox>
        <p>Right</p>
      </BodyRightBox>
    </BodyBox>
  );
}
