import { useEffect } from "react";
import { AppBox } from "../../App.style";
import useRuntime from "../../data-lib/hook/useRuntime";
import useInBound from "../../hook/useInBound";
import Header from "../1-header/Header";
import Body from "../2-body/Body";
import Footer from "../3-footer/Footer";
import DayModal from "../day-modal/DayModal";
import { yearPlanner as yearPlannerValidation} from '../../util/validation';
import useOutBound from "../../hook/useOutBound";
import useCommon from '../../hook/useCommon';

const YearPlanner = function () {
  const { loadValidation } = useRuntime();
  const { year, country, state } = useInBound();
  const { setUuid } = useOutBound();

  const { moveToYear } = useCommon();

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
