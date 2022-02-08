import styled from '@emotion/styled';

import newbtn from 'src/assets/main/btn-plus.svg';
// import { Dimension } from 'src/Constants';

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
    background-color: #ffffff;
    overflow-y: scroll;

    .desc {
        padding-bottom: 3rem;
        margin-top: 0.75rem;
        color: rgb(127, 127, 127);
        font-size: 1rem;
    }
`;

export const Top = styled.div`
    height: fit-content;
    max-height: 325px;
    background-color: #008fff;
`;

export const Header = styled.header`
    display: flex;
    height: 2.9rem;
    align-items: center;
    justify-content: space-between;

    .myspot-title {
        margin-left: 0.75rem;
        color: #fff;
        font-size: 1.5rem;
        font-stretch: normal;
        font-style: normal;
        font-weight: bold;
        letter-spacing: 0.16px;
        line-height: 1.33;
    }

    .mypage-img {
        width: 2rem;
        height: 2rem;
        margin-right: 1.125rem;
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
    margin-top: 29px;
    margin-bottom: 16px;
    margin-left: 16px;
    color: #fff;
    font-size: 24px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0.16px;
    line-height: 1.33;
`;
export const RecentMap = styled.div`
    margin: 34px 16px;

    .text-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 21px;
        color: #fff;
        font-stretch: normal;
        font-style: normal;
        font-weight: normal;
        letter-spacing: 0.12px;
        line-height: 0.89;

        .title {
            font-size: 18px;
        }

        .see-more {
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
    }

    .map-area {
        display: flex;
        height: fit-content;
    }
`;

export const MapChip = styled.div`
    display: flex;
    width: fit-content;
    height: 30px;
    align-items: center;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: 6px;
    margin-bottom: 6px;
    background-color: #fff;
    border-radius: 2px;
    color: #008fff;
    cursor: pointer;
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.1px;
    line-height: 1.14;
`;
export const Maps = styled.div`
    margin-top: 36px;
    margin-right: 16px;
    margin-left: 16px;

    .title-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .title {
            color: #000;
            font-size: 18px;
            font-stretch: normal;
            font-style: normal;
            font-weight: bold;
            letter-spacing: 0.12px;
            line-height: 0.89;
        }

        .see-more {
            color: #9e9e9e;
            cursor: pointer;
            font-size: 14px;
            font-stretch: normal;
            font-style: normal;
            font-weight: 500;
            letter-spacing: 0.1px;
            line-height: 1.14;
        }
    }

    .map-area {
        display: flex;
        flex-direction: column;
    }
`;

export const FloatingWrapper = styled.div<{ active: boolean }>`
    position: fixed;
    bottom: 1rem;
    display: flex;
    width: 100vh;
    max-width: 360px;
    justify-content: flex-end;
`;
// max-width: ${Dimension.MaxWidth};

export const NewBtn = styled.div`
    display: flex;
    width: 54px;
    height: 54px;
    align-items: center;
    justify-content: center;
    background-image: url(${newbtn});
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.11px;
    line-height: normal;
`;
