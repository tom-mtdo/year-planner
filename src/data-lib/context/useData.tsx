import { useState } from "react";
import { get, pickBy, set } from "lodash";
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

  return { data, getValue, setValue, removeValue, removeValue2 };
}
