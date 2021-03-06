import styled from "styled-components";

export const StyledSettingsBox = styled.div`
    min-width: 300px;
    border: solid gray 1px;
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    justify-content: center;
    margin: 0 1.5em 0 0;
`;

export const StyledSettingsHeader = styled.div<any>`
    padding: 12px;
    background: ${props => props.isEditing ? "palevioletred" : "white"};
    width: 100%;
    box-sizing: border-box;
`;

export const StyledSettingsBody = styled.div`
    border-top: solid 1px darkgray;
    border-bottom: solid 1px darkgray;
    box-sizing: border-box;
    padding: 24px;
    text-align: left;
`;

export const StyledSettingsFooter = styled.div`
    padding: 12px;
`;

