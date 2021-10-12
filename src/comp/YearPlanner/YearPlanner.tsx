import { AppBox } from "../../App.style";
import Header from "../1-header/Header";
import Body from "../2-body/Body";
import Footer from "../3-footer/Footer";
import DayModal from "../day-modal/DayModal";
// import { useContext, useRef } from "react";
// import { DataContext } from "../../data-lib/context/DataProvider";
// import { getCalendar } from "../util/util";
// import { cloneDeep, isEmpty, isNumber } from "lodash";

export const YearPath = "runtime.year";
export const CalendarPath = "runtime.calendar";

const YearPlanner = function () {
  // const { getCompValue, setCompValue } = useContext(DataContext);
  // const userContent: any = useRef([]);

  // if (getCompValue && setCompValue) {
  //   const year = getCompValue(YearPath);
  //   userContent.current = getCompValue(`content.${year}`);
  // }

  // put this code into event handler when user change year
  // useEffect(() => {
  //   if (!isEmpty(userContent.current) && getCompValue && setCompValue) {
  //     const calendar = getCompValue(CalendarPath);
  //     const draft = cloneDeep(calendar);
  //     Object.keys(userContent.current).forEach((strDate, index) => {
  //       const mm = parseInt(strDate.substr(4, 2)) - 1;
  //       const dd = parseInt(strDate.substr(6, 2)) - 1;
  //       if (isNumber(mm) && isNumber(dd) && draft[mm][dd]) {
  //         draft[mm][dd].note = userContent.current[strDate].note;
  //       }
  //     });
  //     setCompValue(CalendarPath, draft);
  //   }
  // }, [getCompValue, setCompValue]);


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
