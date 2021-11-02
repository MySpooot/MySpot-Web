import React, { FC } from 'react';
import { Global, css } from '@emotion/react';

const globalStyle = css`
    body {
        margin: aaa;
    }
`;

const GlobalStyle: FC = () => <Global styles={globalStyle} />;

export default GlobalStyle;
