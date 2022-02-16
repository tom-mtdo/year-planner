import styled from "styled-components";

export const HSpacer = styled.div`
    height: 100%;
    min-width: 30px;
`;

export const VSpacer = styled.div`
    min-height: 24px;
    width: 100%;
`;

export const StyledH1 = styled.h1`
    margin: 0;
    padding 0;
`

export const StyledH2 = styled.h2`
    margin: 0;
    padding 0;
`

export const StyledP = styled.p`
    margin: 0;
    padding 1em;
`

// table
export const StyledTable = styled.div<{border?: string, minWidth?: string}>`
    display: flex;
    flex-direction: row;
`;

export const StyledRow = styled.div<{minHeight?: string}>`
    display: flex;
    text-align: center;
    margin: 0;
    padding: 0;
    min-width: 2200px;
    min-height: ${props => props.minHeight ?? '75px'}
`;

export const StyledCell = styled.div<{border?: string, minWidth?: string}>`
    flex-grow: 1;
    width: 100%;  // Default to full width
    padding: 0;
    overflow: hidden; // Or flex might break
    border: ${props => props.border ?? 'solid 1px darkgrey'};
    min-width: ${props => props.minWidth ?? 'unset'};
    box-sizing: border-box;
    text-align: center;
`;

export const StyledHeadColumn = styled.div`
    border: solid 1px gray;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 1.5em;
    z-index: 2;
`;
export const StyledContent = styled.div`
    border: solid 1px gray;
`;