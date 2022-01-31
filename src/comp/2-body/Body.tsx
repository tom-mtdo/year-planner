import React from "react";
import { BodyBox, BodyLeftBox, BodyCenterBox, BodyRightBox } from './Body.style';
import PlannerContent from './calendar/Calendar';
import Settings from "../settings/Settings";

function Body() {
  return (
    <BodyBox>
      <BodyLeftBox />
      <BodyCenterBox>
        <PlannerContent />
      </BodyCenterBox>
      <BodyRightBox>
        <Settings />
      </BodyRightBox>
    </BodyBox>
  );
}

export default Body;