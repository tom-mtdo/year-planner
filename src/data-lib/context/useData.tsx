import { useState } from "react";
import { get, pick, pickBy, set } from "lodash";
import { produce } from "immer";

export default function useData(prepop?: any) {
  const [data, setData] = useState(prepop ?? {});

  const getValue = (dataPath: string) => {
    return get(data, dataPath, undefined);
  };

  const setValue = (dataPath: string, value: any) => {
    setData((prevData: any) => {
      return produce(prevData, (draft: any) => {
        set(draft, dataPath, value);
      });
    });
  };

  /**
   * 
   * @param dataPath dataPath to object
   * @param pickKey key to return value
   * return: key & value pair of the object
   * 
   * e.g. registry : {
   *  page1.comp1: "Tom"
   * }
   * 
   * dataPath = registry
   * pickKey = page1.comp1
   * return page1.comp1: "Tom"
   * 
   */
  const pickKeyValue = (dataPath: string, pickKey: string) => {
    return pick(data[dataPath], pickKey);
  }

  // Todo Use Regex
  // Remove key value from an object specified by dataPath
  // if keyPattern is empty, then the object will be empty
  const removeValue = (dataPath: string, keyPattern: string = '') => {
    // const regex = new RegExp(keyPattern);

    setData((prevData: any) => {
      return produce(prevData, (draft: any) => {
        const prevSubData = get(prevData, dataPath, {});
        const newSubData = Boolean(keyPattern)
          ? pickBy(prevSubData, (value, key) => {
              return key !== keyPattern;
            })
          : {};

        set(draft, dataPath, newSubData);
      });
    });
  };

  // Todo Use Regex to merge 2 functions into 1
  const removeValue2 = (dataPath: string, keyPattern: string = '') => {
    // const regex = new RegExp(keyPattern);

    setData((prevData: any) => {
      return produce(prevData, (draft: any) => {
        const prevSubData = get(prevData, dataPath, {});
        const newSubData = Boolean(keyPattern)
          ? pickBy(prevSubData, (value, key) => {
              return !key.includes(keyPattern);
            })
          : {};

        set(draft, dataPath, newSubData);
      });
    });
  };

  return { data, getValue, setValue, removeValue, removeValue2, pickKeyValue };
}
