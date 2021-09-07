import { getPlannerContent } from "../util/util";
import { useContext } from 'react';
import { DataContext } from '../data-lib/context/DataProvider';
import { isEmpty, isNumber } from "lodash";

export interface UsePlanner {
    year: number;
}

export default function usePlanner(props: UsePlanner) {
    const { year } = props
    const { getCompValue } = useContext(DataContext);
    const savedData: any = getCompValue ? getCompValue(`content.${year}`) : {};
    // table content
    const content = getPlannerContent(year);

    if (savedData && !isEmpty(savedData)) {
        Object.keys(savedData).forEach((strDate, index) => {
            const mm = parseInt(strDate.substr(4, 2)) - 1;
            const dd = parseInt(strDate.substr(6, 2)) - 1;
            if (isNumber(mm) && isNumber(dd) && content && !isEmpty(content)) {
                content.content[mm][dd].description = savedData[strDate].description;
            }
        })
    }
    return {content};
}