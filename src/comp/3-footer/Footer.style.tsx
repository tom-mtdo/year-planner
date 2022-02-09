import styled from "styled-components";

export const StyledFooter = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 1.3em 1.5em;
    flex-flow: column wrap;
    @media (min-width: 700px) {
        flex-flow: row wrap;
    }
`;
export const StyledNote = styled.div`
    padding: 0.2em 0;
    font-style: italic;
`
export const StyledCopyRight = styled.div`
    padding: 0.2em 0;
`
export const StyledInfo = styled.div`
    padding: 0.2em 0;
`