import styled from "styled-components";

export const StyledDay = styled.div<{
  isWeekend: boolean;
  isCurrent: boolean;
  isHoliday: boolean;
}>`
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  background-color: ${(props) =>
    props.isCurrent
      ? "greenyellow"
      : props.isHoliday
      ? "gold"
      : props.isWeekend
      ? "bisque"
      : "white"};
`;

export const StyledDateNum = styled.span`
  position: absolute;
  left: 0;
  top: 0;
`;

export const StyledNote = styled.span`
  position: absolute;
  width: 100%;
  left: 0;
  top: 17px;
  font-size: x-small;
`;

export const StyledHoliday = styled.span`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  font-size: x-small;
`;

export const StyledDayVoid = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  background-color: unset;
`;