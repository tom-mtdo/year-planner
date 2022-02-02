import styled from "styled-components";

export const StyledRow = styled.div<{minHeight?: string}>`
    display: flex;
    text-align: center;
    margin: 0;
    padding: 0;
    min-width: 2200px;
    min-height: ${props => props.minHeight ?? '75px'}
`;

