import { BOOLEAN_VALUES } from "../util/constant";

export interface IUseInBound {
    [key: string]: any;
}

export default function useInBound(props: any) {
    const prepopData = {
        settings: {showSettings: BOOLEAN_VALUES.FALSE},
        content: {
            2021: {
                20210907: { description: 'Start using' },
                20211001: { description: 'Checkprogress' }
            }
        }
    }
    
    return ({prepopData});
};