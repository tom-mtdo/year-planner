import React from "react";
import { BodyBox, BodyLeftBox, BodyCenterBox, BodyRightBox } from './Body.style';
import PlannerContent from '../planner/Planner';
import Settings from "../settings/Settings";

function Body() {
  return (
    <BodyBox>
      <BodyLeftBox />
      <BodyCenterBox>
        <PlannerContent />
      </BodyCenterBox>
      <BodyRightBox>
        <Settings>
          <p>Setting here</p>
        </Settings>
      </BodyRightBox>
    </BodyBox>
  );
}

export default Body;