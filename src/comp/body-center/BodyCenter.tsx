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

export default function Body(){
    const { content } = usePlanner({year: 2021});

    // header
    let corner= <Cell key={'label'}><Day colIndex={0}></Day></Cell>;
    let headerCell: any = [];
    if(Array.isArray(content?.header)){
        headerCell = content?.header.map((dayLabel, index) => {
            return <Cell key={index}><DayLabel colIndex={index}><span>{dayLabel}</span></DayLabel></Cell>
        })
    }
    const headerRow = <Row key={'label'} minHeight={'unset'}>{[corner, ...headerCell]}</Row>

    // content
    const months = content?.content.map((aMonth, index) => {
        const monthLabel = <Cell key={'label'}><MonthLabel><span style={{width: "100%", fontWeight: "bold"}}>{MONTH_SHORT_NAME[index]}</span></MonthLabel></Cell>
        const monthCell = aMonth.map((aDay: DayInfo, index) => {
            // return a day
            return(<Cell key={index}><Day dayInfo={aDay} colIndex={index}></Day></Cell>);
        });
        // return a month
        return (<Row key={index}>{[monthLabel, ...monthCell]}</Row>);
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