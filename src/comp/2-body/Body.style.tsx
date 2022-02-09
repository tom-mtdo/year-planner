import styled from "styled-components";

export const BodyBox = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
`;

export const BodyLeftBox = styled.div`
    text-align: center;
    flex-grow: 1;
    padding: 0 12px;
`;

export const BodyCenterBox = styled.div`
    text-align: center;
    flex-grow: 10;
    overflow: hidden;
    padding: 0 0.2em;

    @media (min-width: 700px) {
        padding: 0 1.5em;
    }
`;

export const BodyRightBox = styled.div`
    text-align: center;
    flex-grow: 3;
`;