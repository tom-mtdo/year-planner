import styled from "styled-components";
import { wideScreen } from "../../util/theme";

export const StyledFooter = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 0.2em;
    flex-flow: column wrap;

    @media (min-width: ${wideScreen}) {
        flex-flow: row wrap;
        padding: 1.3em 1.5em;
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