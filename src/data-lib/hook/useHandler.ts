import { get } from "lodash";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { validateComp } from "../util/validation";
import { names } from "../../util/constant";
import useRuntime from "./useRuntime";

export default function useHandler(props?: { compForm?: string }) {
  const { data, setValue, getValue, removeValue } = useContext(DataContext);
  const { getValidation } = useRuntime();
  const yearPlannerValidation = getValidation();

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
    const dataPath = get(dataSet, "compDataPath", "unknown-comp");
    const value =
      event?.target?.value ?? event?.currentTarget?.value ?? undefined;

    if (setValue) {
      setValue(dataPath, value);
    }
  };

  const onBlur = (event: any) => {
    const dataSet =
      event?.target?.dataset || event?.currentTarget?.dataset || undefined;
    const dataPath = get(dataSet, "compDataPath", "unknown-comp");

    if (dataPath) {
      validate(dataPath, yearPlannerValidation);
    }
  };

  /**
   * 
   * @param compDataPath 
   * 
   * TODO: 
   * 1. Need to remove iteration index, e.g. [1] before getting compValidation
   * - validation should be:
   * yearPlannerValidation = {
   *  "temp.settings.year": {
   *    required: {expression: true, message: "Please provide year in format YYYY"},
   *    length: {expression: 4, message: "Length is 4 chars"}
   *  },
   *  "personalDetails.otherNames.lastName": {
   *    required: {expression: true, message: "Please provide last name"}
   *  }
   * }
   * 
   * - Field to be validate can have dataPath like:
   * "personalDetails.otherNames[1].lastName"
   * so need to remove index to get personalDetails.otherNames.lastName
   * 
   * - Each comp in repeat still can have diffrent validation base on compDataPath pass in through runtimeParam
   * 
   * 2. pass in validation object instead of direct import like this
   */

  const validate = (compDataPath: string, validation: any) => {
    const compValidation = get(validation, compDataPath) || {};
    const compValue = getValue ? getValue(compDataPath) : "";
    const runtimeParam = {
      compDataPath,
      compValue,
      data,
    };

    const errorMsg = validateComp(compValidation, runtimeParam);

    // save error
    // note error is an object, which has:
    // each key is data path, value is error message.
    // this make it easier to check if there is any error or not.
    // Todo: error root should be override?
    // e.g. data: {
    //   error: {
    //      settings.year: "lenght should be 4 chars"
    //   }
    // }

    if (errorMsg && setValue) {
      const errorPath = `${names.error}['${compDataPath}']`;
      setValue(errorPath, errorMsg);
    }

    if (!errorMsg && removeValue) {
      removeValue(names.error, compDataPath);
    }

    return errorMsg;
  };

  return { onChange, onBlur, validate };
}
