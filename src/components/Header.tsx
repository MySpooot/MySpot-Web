import React, { FC, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const style = css`
    color: red;
`;

const Button = styled.button`
    background-color: yellow;
`;

const Header: FC = () => {
    useEffect(() => {
        console.log('useEffect');
    }, []);

    return (
        <header css={style}>
            Header
            <Button>sadsad</Button>
        </header>
    );
};

export default Header;
