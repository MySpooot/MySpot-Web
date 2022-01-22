import styled from '@emotion/styled';

import { Dimension } from 'src/Constants';

// main by haeun
export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

export const Main = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    overflow-y: scroll;

    .desc {
        padding-bottom: 3rem;
        margin-top: 0.75rem;
        color: rgb(127, 127, 127);
        font-size: 1rem;
    }
`;

export const Header = styled.header`
    display: flex;
    height: 5rem;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
    font-weight: bold;

    .myspot-logo {
        width: 7.75rem;
        height: 1.8rem;
    }

    .mypage-img {
        width: 3.75rem;
        height: 3.75rem;
        cursor: pointer;
    }
`;

export const WelcomeSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 3rem;
    font-size: 2rem;
`;

export const User = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.5rem;
    line-height: 3rem;

    b {
        font-weight: 700;
    }

    span {
        font-weight: 200;
    }
`;

export const Maps = styled.div`
    .title-area {
        display: flex;
        align-items: center;
        margin-top: 3.75rem;

        .title {
            padding-right: 0.75rem;
            font-size: 1rem;
        }
    }

    .map-area {
        display: flex;
        padding-top: 0.75rem;
    }
`;

export const FloatingWrapper = styled.div<{ active: boolean }>`
    position: fixed;
    bottom: 1rem;
    display: flex;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    justify-content: center;
`;

export const NewBtn = styled.div`
    display: flex;
    width: 100%;
    height: 3.5rem;
    align-items: center;
    justify-content: center;
    background-color: rgb(51, 51, 51);
    border-radius: 0.5rem;
    color: #ffffff;
    cursor: pointer;
`;
