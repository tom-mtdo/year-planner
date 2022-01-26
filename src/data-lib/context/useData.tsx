import { useState } from "react";
import { cloneDeep, get, pick, pickBy, set } from "lodash";
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
  const removeValue = (dataPath: string, keyPattern: string = '', includeChildren: boolean = false) => {
    // const regex = new RegExp(keyPattern);
    let result;
    setData((prevData: any) => {
      return produce(prevData, (draft: any) => {
        const prevSubData = get(prevData, dataPath, {});
        const newSubData = Boolean(keyPattern)
          ? pickBy(prevSubData, (value, key) => {
              return includeChildren === true
              ? !key.includes(keyPattern)
              : key !== keyPattern;
            })
          : {};

        set(draft, dataPath, newSubData);

        // this is for unit test only
        // TODO remove when jest is setup for work with wait/async
        // result = cloneDeep(draft);
      });
    });

    return result;
  };

  return { data, getValue, setValue, removeValue, pickKeyValue };
}
