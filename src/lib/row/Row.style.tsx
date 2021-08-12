import styled from "styled-components";

export const StyledRow = styled.div<{minHeight?: string}>`
    display: flex;
    text-align: center;
    margin: 0;
    padding: 0;
    min-width: 1900px;
    min-height: ${props => props.minHeight ?? '70px'}
`;

