import styled from "styled-components";

export const StlyedDayLabel = styled.div<{isWeekend: boolean, isVoid: boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 0;
    background-color: ${props => props.isVoid
        ? 'unset'
        : props.isWeekend ? 'bisque' : 'white'};
    text-align: center;
    font-weight: bold;
`;
