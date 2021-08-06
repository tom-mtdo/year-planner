import styled from "styled-components";

export const StyledDay = styled.div<{isWeekend: boolean}>`
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0;
    position: relative;
    background-color: ${props => props.isWeekend ? 'lightgray' : 'white'};
`;

export const StyledDateNum = styled.span`
    position: absolute;
    left: 0;
    top: 0;
`;

