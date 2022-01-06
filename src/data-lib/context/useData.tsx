import { useState } from "react";
import { get, pickBy, set } from "lodash";
import { produce } from "immer";

export default function useData(prepop?: any) {
    const [data, setData] = useState(prepop ?? {});

    const getValue = (dataPath: string) => {
        return get(data, dataPath, undefined);
    }

    const setValue = (dataPath: string, value: any) => {
        setData((prevData: any) => {
            return produce(prevData, (draft: any) => {
                set(draft, dataPath, value);
            });            
        });
    }

    // Remove key value from an object specified by dataPath
    const removeValue = (dataPath: string, removeKey: string) => {
        setData((prevData: any) => {
            return produce(prevData, (draft: any) => {
                const prevSubData = get(prevData, dataPath, {});
                const newSubData = pickBy(prevSubData, (value, key) => {
                    return key !== removeKey
                });

                set(draft, dataPath, newSubData);
            });            
        });
    }

    return { data, getValue, setValue, removeValue };
}