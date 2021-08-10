import React from "react";
import { BodyCenterBox } from "./BodyCenter.style";
import Row from '../../lib/row/Row';
import Cell from '../../lib/cell/Cell';
import Day from "../day/Day";
import { MONTH_SHORT_NAME } from "../../util/constant";
import usePlanner from "../../hook/usePlanner";
import { DayInfo } from '../../util/util';
import DayLabel from '../day-label/DayLabel';
import MonthLabel from "../month-label/MonthLabel";

export const MONTH_LABEL_MIN_WIDTH = '60px';

export default function Body(){
    const year = 2021;
    const month = 8;
    const day = 10;
    const { content } = usePlanner({year});

    // corner
    let corner= <Cell key={'label'} minWidth={MONTH_LABEL_MIN_WIDTH}><DayLabel colIndex={-5}>{year}</DayLabel></Cell>;

    // header
    let headerCell: any = [];
    if(Array.isArray(content?.header)){
        headerCell = content?.header.map((dayLabel, index) => {
            return <Cell key={index}><DayLabel colIndex={index}><span>{dayLabel}</span></DayLabel></Cell>
        })
    }
    const headerRow = <Row key={'label'} minHeight={'unset'}>{[corner, ...headerCell]}</Row>

    // content
    const months = content?.content.map((aMonth, monthIndex) => {
        const monthLabel = <Cell key={'label'} minWidth={MONTH_LABEL_MIN_WIDTH}><MonthLabel><span style={{width: "100%", fontWeight: "bold"}}><h2>{MONTH_SHORT_NAME[monthIndex]}</h2></span></MonthLabel></Cell>
        const monthCell = aMonth.map((aDay: DayInfo, dayIndex) => {
            // return a day
            if ( monthIndex === month - 1 && dayIndex === day) {
                return (<Cell key={dayIndex}><Day dayInfo={aDay} colIndex={dayIndex} isCurrent={true}></Day></Cell>);    
            } else {
                return (<Cell key={dayIndex}><Day dayInfo={aDay} colIndex={dayIndex}></Day></Cell>);
            }
        });
        // return a month
        return (<Row key={monthIndex}>{[monthLabel, ...monthCell]}</Row>);
    })

    const planner = [headerRow];
    if(Array.isArray(months)){
        planner.push(...months);
    }

    return(
        <BodyCenterBox>
            {planner}
        </BodyCenterBox>
    );
}