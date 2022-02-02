import styled from "styled-components";

export const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

export const StyledModalBox = styled.div`
    border: solid gray 1px;
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    justify-content: center;
`;

export const StyledModalHeader = styled.div`
    padding: 12px;
`;

export const StyledModalBody = styled.div`
    min-width: 500px;
    min-height: 200px;
    border-top: solid 1px darkgray;
    border-bottom: solid 1px darkgray;
    box-sizing: border-box;
    padding: 12px;
`;

export const StyledModalFooter = styled.div`
    padding: 12px;
`;
