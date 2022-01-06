import { get } from "lodash";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { yearPlanner as yearPlannerValidation } from "../../util/validation";
import { validateComp } from "../util/validation";
import { names } from "../../util/constant";

export default function useHandler(props?: { compForm?: string }) {
  const { data, setValue, getValue, removeValue } = useContext(DataContext);

  /**
   *
   * @param event : there are 2 type of event
   * - Original javascript event, as normal
   * - Framework event: which is use if UI comp don't work as normal
   * {
   *  // make up properties as standard javascript event
   *  target: {dataset: {dataPath}}
   *
   *  // original event return by UI comp,
   *  // which can be standard javascript event or event made up by UI comp
   *  event
   * }
   */

  //  target: {
  //   dataset: {
  //     dataPath,
  //   },
  //   value: event.target.checked,
  // },
  // event

  const onChange = (event: any) => {
    const dataSet =
      event?.target?.dataset || event?.currentTarget?.dataset || undefined;
    const dataPath = get(dataSet, "dataPath", "unknown-comp");
    const value =
      event?.target?.value ?? event?.currentTarget?.value ?? undefined;

    if (setValue) {
      setValue(dataPath, value);
    }
  };

  const onBlur = (event: any) => {
    const dataSet =
      event?.target?.dataset || event?.currentTarget?.dataset || undefined;
    const dataPath = get(dataSet, "dataPath", "unknown-comp");

    if (dataPath) {
      validate(dataPath);
    }
  };

  const validate = (dataPath: string) => {
    const compValidation = get(yearPlannerValidation, dataPath);
    const compValue = getValue ? getValue(dataPath) : "";
    const runtimeParam = {
      compDataPath: dataPath,
      compValue,
      data,
    };

    const errorMsg = validateComp(compValidation, runtimeParam);

    // save error
    // note error is an array of key value (not json object tree structure)
    // where key is data path, value is error message.
    // this make it easier to check if there is any error or not.
    if (errorMsg && setValue) {
      const errorPath = `${names.error}['${dataPath}']`;
      setValue(errorPath, errorMsg);
    }

    if (!errorMsg && removeValue) {
      removeValue(names.error, dataPath);
    }
  };

  return { onChange, onBlur };
}
