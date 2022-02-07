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
    overflow-y: scroll;
    background-color: #ffffff;
    .desc {
        padding-bottom: 3rem;
        margin-top: 0.75rem;
        color: rgb(127, 127, 127);
        font-size: 1rem;
    }
`;

export const Top = styled.div`
    height: 325px;
    background-color: #008fff;
    height: fit-content;
`;

export const Header = styled.header`
    display: flex;
    height: 2.9rem;
    align-items: center;
    justify-content: space-between;

    .myspot-title {
        font-size: 1.5rem;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: 0.16px;
        color: #fff;
        margin-left: 0.75rem;
    }

    .mypage-img {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        margin-right: 1.125rem;
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
    font-size: 24px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: 0.16px;
    color: #fff;
    margin-top: 29px;
    margin-left: 16px;
    margin-bottom: 16px;
`;
export const RecentMap = styled.div`
    margin: 34px 16px;
    .text-bar {
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 0.89;
        letter-spacing: 0.12px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        margin-bottom: 21px;
        .title {
            font-size: 18px;
        }

        .see-more {
            font-size: 14px;
            font-weight: 500;
        }
    }
    .map-area {
        height: fit-content;
        display: flex;
        .map-chip {
            display: flex;
            align-items: center;
            height: 30px;
            width: fit-content;
            padding-left: 8px;
            padding-right: 8px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: 0.1px;
            color: #008fff;
            border-radius: 2px;
            background-color: #fff;
            margin-right: 6px;
            margin-bottom: 6px;
        }
    }
`;
export const Maps = styled.div`
    margin-top: 36px;
    margin-left: 16px;
    margin-right: 16px;
    .title-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .title {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.89;
            letter-spacing: 0.12px;
            color: #000;
        }

        .see-more {
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: 0.1px;
            color: #9e9e9e;
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
    justify-content: center;
    width: 100vh;
    max-width: 360px;
    justify-content: flex-end;
`;
// max-width: ${Dimension.MaxWidth};

export const NewBtn = styled.div`
    width: 54px;
    height: 54px;
    background-image: url(${newbtn});
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.11px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
`;
