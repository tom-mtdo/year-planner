import { BOOLEAN_VALUES } from "../util/constant";
import { getCalendar } from "../util/util";

export interface IUseInBound {
    [key: string]: any;
}

export default function useInBound(props: any) {
    const toDay = new Date();
    const currentYear = toDay.getFullYear();
    const calendar = getCalendar(currentYear);

    // set current year as default
    const prepopData = {
        runtime: {
            dayModal: {
                isShown: BOOLEAN_VALUES.FALSE,
                dayInfo: {
                    note: ''
                }
            },
            year: currentYear,
            calendar
        },
        settings: {
            showSettings: BOOLEAN_VALUES.FALSE
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