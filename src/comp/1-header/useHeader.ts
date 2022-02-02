import { isNumber } from "lodash";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useCommon from "../../hook/useCommon";
import { paths } from "../../util/constant";
import { CHANGE_YEAR_TYPE } from "./Header";

export {};

const useHeader = function() {
    const { getValue } = useContext(DataContext);
    const { moveToYear } = useCommon();
  
    const strActiveYear = getValue ? getValue(paths.runtime.year) : "";
    const activeYear = parseInt(strActiveYear);
  
    const changeYear = (value: number, valueType?: CHANGE_YEAR_TYPE) => {
      if (isNumber(value)) {
        const newYear =
          CHANGE_YEAR_TYPE.VALUE === valueType ? value : activeYear + value;
        moveToYear(`${newYear}`);
      }
    };

    return { activeYear, changeYear }
}

export default useHeader;