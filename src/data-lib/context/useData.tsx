import { useState } from "react";
import { get, set } from "lodash";
import { produce } from "immer";

export default function useData(prepop?: any) {
    const [data, setData] = useState(prepop ?? {});

    const getCompValue = (dataPath: string) => {
        return get(data, dataPath, undefined);
    }

    const setCompValue = (dataPath: string, value: any) => {
        setData((prevData: any) => {
            return produce(prevData, (draft: any) => {
                set(draft, dataPath, value);
            });            
        });
    }

    return { data, getCompValue, setCompValue };
}