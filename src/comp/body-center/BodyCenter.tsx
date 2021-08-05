import React from "react";
import { BodyCenterBox } from "./BodyCenter.style";
import Row from '../../lib/row/Row';
import Cell from '../../lib/cell/Cell';
// import Day from '../day/Day';
// import DayLabel from "../day-label/DayLabel";
// import MonthLabel from "../month-label/MonthLabel";

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const totalColumn = 38; 

export const getMonthInfo = (month: number) => {
    const year = 2021;
    const firstDate = new Date(year, month, 1  );
    const firstDay = firstDate.getDay();
    return({
        firstDate,
        lastDate: new Date(year, month + 1, 0),
        shortLabel: monthShortNames[month],
        offset: firstDay === 0 ? 6 : firstDay - 1
    })
};

export default function Body(){
    const dayLabels = [<Cell><span>*</span></Cell>];
    for(let i=1; i<totalColumn; i++) {
        let dayLabel;
        switch(i % 7) {
            case 1:
                dayLabel = 'Mon';
                break;
            case 2:
                dayLabel = 'Tue';
                break;
            case 3:
                dayLabel = 'Wed';
                break;
            case 4:
                dayLabel = 'Thu';
                break;
            case 5:
                dayLabel = 'Fri';
                break;
            case 6:
                dayLabel = 'Sat';
                break;
            case 0:
                dayLabel = 'Sun';
                break;
            default:
                dayLabel = '*';
        } 
            
        dayLabels.push(<Cell><span>{dayLabel}</span></Cell>)
    };
    const dayLabelRow = (
        <Row>
            {dayLabels}
        </Row>
    )
    const aYear = [dayLabelRow];
    let aMonth;
    for(let i=0; i<12; i++) {
        aMonth = [];
        
        // get month info
        const monthInfo = getMonthInfo(i)
        const lastDateNum = monthInfo.lastDate.getDate();

        // Month label, first & last day
        aMonth.push(<Cell><span>{monthInfo.shortLabel}</span></Cell>);

        // offset
        for(let j=1; j<=monthInfo.offset; j++) {
            aMonth.push(<Cell><span>-</span></Cell>)
        };

        // other days in month
        for(let j=1; j<=lastDateNum; j++) {
            aMonth.push(<Cell><span>{j}</span></Cell>)
        };
        
        // the rear offset
        const restNum = totalColumn - 1 - monthInfo.offset - lastDateNum;
        for(let j=0; j<restNum ; j++) {
            aMonth.push(<Cell><span>-</span></Cell>)
        };


        aYear.push(<Row>{aMonth}</Row>);
    };

    return(
        <BodyCenterBox>
            {aYear}
        </BodyCenterBox>
    );
}