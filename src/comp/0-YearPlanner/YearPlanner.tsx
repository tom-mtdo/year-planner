import { AppBox } from "../../App.style";
import Header from "../1-header/Header";
import Body from "../2-body/Body";
import Footer from "../3-footer/Footer";
import DayModal from "../day-modal/DayModal";

import useYearPlanner from "./useYearPlanner";

const YearPlanner = function () {
  useYearPlanner();

  return (
    <>
      <DayModal />
      <AppBox>
        <Header />
        <Body />
        <Footer />
      </AppBox>
    </>
  );
};

export default YearPlanner;
