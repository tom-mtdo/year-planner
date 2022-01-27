import { useContext, useEffect } from "react";
import { AppBox } from "../../App.style";
import { DataContext } from "../../data-lib/context/DataProvider";
import useRuntime from "../../data-lib/hook/useRuntime";
import useInBound from "../../hook/useInBound";
import Header from "../2-header/Header";
import Body from "../3-body/Body";
import Footer from "../4-footer/Footer";
import DayModal from "../day-modal/DayModal";
import { yearPlanner as yearPlannerValidation} from '../../util/validation';
import useYearPlanner from './useYearPlanner';

const YearPlanner = function () {
  const { loadValidation } = useRuntime();
  const {setUuid, year, country, state } = useInBound();
  const { moveToYear } = useYearPlanner();

  useEffect(() => {
    loadValidation(yearPlannerValidation);
    setUuid();
    moveToYear(year, country, state);
    // saveUserDataToContext();
  }, []);

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
