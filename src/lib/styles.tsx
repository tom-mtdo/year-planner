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

export const StyledCell = styled.div<{border?: string, minWidth?: string, minHeight?: string}>`
    flex-grow: 1;
    width: 100%;  // Default to full width
    padding: 0;
    overflow: hidden; // Or flex might break
    border: ${props => props.border ?? 'solid 1px darkgrey'};
    min-width: ${props => props.minWidth ?? 'unset'};
    min-height: ${props => props.minHeight ?? 'unset'};
    box-sizing: border-box;
    text-align: center;
`;

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