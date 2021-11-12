import { AppBox } from "../../App.style";
import Header from "../2-header/Header";
import Body from "../3-body/Body";
import Footer from "../4-footer/Footer";
import DayModal from "../day-modal/DayModal";

const YearPlanner = function () {

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
