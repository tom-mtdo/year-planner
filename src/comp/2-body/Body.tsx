import React from "react";
import { BodyBox, BodyLeftBox, BodyCenterBox, BodyRightBox } from "./Body.style";
import PlannerContent from '../planner/Planner';

export default function Body() {
  return (
    <BodyBox>
      <BodyLeftBox />
      <BodyCenterBox>
        <PlannerContent />
      </BodyCenterBox>
      <BodyRightBox />
    </BodyBox>
  );
}
