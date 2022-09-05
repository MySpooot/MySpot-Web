import styled from '@emotion/styled';

import { Palette } from 'src/Constants';

export const Container = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const TitleTab = styled.div`
    display: flex;
    height: 2.875rem;
    padding: 0 1rem;
    border-bottom: #e8e8e8 solid 0.0625rem;
`;

export const Tab = styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    border-bottom: ${props => (props.active ? `solid 2px ${Palette.Blue[500]}` : 'none')};
    margin-right: 1.25rem;
    color: ${props => (props.active ? Palette.Blue[500] : 'none')};
    cursor: pointer;
    font-size: 1rem;
    letter-spacing: 0.006875rem;
    line-height: 1;
`;

export const Maps = styled.div`
    height: 100vh;
    padding: 1rem;
`;

export const CardBtnWrapper = styled.div<{ active: number }>`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: ${props => (props.active !== 0 ? 'visible' : 'hidden')};
`;
