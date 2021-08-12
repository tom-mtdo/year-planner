import { getPlannerContent } from "../util/util";

export interface UsePlanner {
    year: number;
}

export default function usePlanner(props: UsePlanner) {
    const { year } = props
    // table content
    const content = getPlannerContent(year);

    return {content};
}