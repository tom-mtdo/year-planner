import styled from 'styled-components';

export const StyledH1 = styled.h1`
    margin: 0;
    padding 0.2em;
    font-size: 1.6em;
`
export const StyledHeader = styled.div`
    display: flex;    
    justify-content: center;    
    align-items: center;
    position: relative;
`;
export const StyledTitleBox = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0 1em 0;
`
export const StyledCtrBox = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 0.2em 0 0;

    @media (min-width: 700px) {
        padding: 0 5em 0 0;
    }
`
export const StyledBriefBox = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    padding: 0.3em;
    margin: 0;
`
export const StyledBrief = styled.span`
    font-weight: bold;
`