import styled from "styled-components";

export const StyledDay = styled.div<{isWeekend: boolean, isCurrent: boolean, isVoid: boolean, isHoliday: boolean}>`
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0;
    position: relative;
    background-color: ${props => props.isCurrent 
        ? 'greenyellow' 
        : props.isVoid 
            ? 'unset' 
            : props.isWeekend 
                ? 'bisque' 
                : props.isHoliday 
                    ? 'gold' 
                    : 'white'};
`;

export const StyledDateNum = styled.span`
    position: absolute;
    left: 0;
    top: 0;
`;

