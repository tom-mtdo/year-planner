import styled from "styled-components";

export const StyledCell = styled.div`
    flex-grow: 1;
    width: 100%;  // Default to full width
    padding: 0;
    overflow: hidden; // Or flex might break
    border: solid 1px darkgrey;
    box-sizing: border-box;
    text-align: center;
`;

