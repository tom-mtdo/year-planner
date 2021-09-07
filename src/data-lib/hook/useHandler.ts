import { get } from "lodash";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

export default function useHandler() {
  const { setCompValue } = useContext(DataContext);

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
    const dataPath = get(dataSet, 'dataPath', 'unknown-comp');
    const value = event?.target?.value || event?.currentTarget?.value || undefined;

    if( setCompValue ) { setCompValue(dataPath, value); }
  };

  return { onChange }
}
