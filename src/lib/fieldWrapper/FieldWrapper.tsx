import React from 'react';
import styled from 'styled-components';

const StyledError = styled.p `
    margin: 3px 0 0 0;
    color: red;
    font-size: small;
`;

const FieldWrapper = (props: any) => {
    const { children, errorMsg } = props;
    return (<>
        {children}
        {Boolean(errorMsg) && <StyledError>{errorMsg}</StyledError>}
    </>);
}

export default FieldWrapper;