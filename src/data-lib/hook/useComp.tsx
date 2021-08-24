import { useContext } from "react";
import { DataContext } from '../context/DataProvider';

export interface IComp {
    compId?: string;
    dataPath?: string;
}

export default function useComp(props: IComp) {
    const { compId, dataPath } = props;

    // context
    const { getCompValue } = useContext(DataContext);
    const compValue = getCompValue ? getCompValue(dataPath ?? '') : undefined;

    return { compValue }
}