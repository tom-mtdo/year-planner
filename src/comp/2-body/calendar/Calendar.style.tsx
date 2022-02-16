import styled from "styled-components";

// Table
export const ContentBox = styled.div`
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    padding: 0 0 0 3.5em;
`;

// Static first column
export const StyledHeadColumn = styled.div`
    background: burlywood;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0.2em;
    z-index: 2;
    min-width: 3.5em;

    @media (min-width: 700px) {
        left: 1.5em;
    }
`;

export const StyledContent = styled.div`
`;

export const StyledRow = styled.div<{minHeight?: string, minWidth?: string}>`
    display: flex;
    text-align: center;
    margin: 0;
    padding: 0;
    min-height: ${props => props.minHeight ?? '75px'};
    min-width: ${props => props.minWidth ?? '2200px'};
`;

export const StyledCell = styled.div<{border?: string, minWidth?: string, minHeight?: string}>`
    flex-grow: 1;
    width: 100%;  // Default to full width
    margin: 0;
    padding: 0;
    overflow: hidden; // Or flex might break
    border: ${props => props.border ?? 'solid 1px darkgrey'};
    min-width: ${props => props.minWidth ?? 'unset'};
    min-height: ${props => props.minHeight ?? 'unset'};
    box-sizing: border-box;
    text-align: center;
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
