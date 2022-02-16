import styled from "styled-components";

export const ContentBox = styled.div`
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    padding: 0 0 0 3.5em;
`;


export const StyledMonthLabelBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 90px;
    padding: 0 4px;
`;

export const StyledMonthLabel = styled.span`
  width: 100%;
  font-weight: bold;
  font-size: 1.3em;
  text-align: left;
  
  @media (min-width: 700px) {
    font-size: 1.5em;
  }
`;