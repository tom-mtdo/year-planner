import styled from "styled-components";

export const StyledCell = styled.div<{border?: string}>`
    flex-grow: 1;
    width: 100%;  // Default to full width
    padding: 0;
    overflow: hidden; // Or flex might break
    border: ${props => props.border ?? 'solid 1px darkgrey'};
    box-sizing: border-box;
    text-align: center;
`;

