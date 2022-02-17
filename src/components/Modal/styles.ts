import styled from '@emotion/styled';

import { Palette } from 'src/Constants';

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: -;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${Palette.Grey[300]};
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 10rem;
    flex-direction: column;
    align-items: center;
`;
