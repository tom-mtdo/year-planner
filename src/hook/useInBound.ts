import { BOOLEAN_VALUES } from "../util/constant";

export interface IUseInBound {
    [key: string]: any;
}

export default function useInBound(props: any) {
    const prepopData = {
        settings: {
            showSettings: BOOLEAN_VALUES.FALSE,
            isDayModalShown: BOOLEAN_VALUES.TRUE
        },
        content: {
            2021: {
                20210907: { note: 'Start using' },
                20211001: { note: 'Checkprogress' }
            }
        }
    }
    
    return ({prepopData});
};