import styled from '@emotion/styled';

import { Palette, Dimension } from 'src/Constants';

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
    max-height: 20.3125rem;
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
    margin-top: 1.8125rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.01rem;
    line-height: 1.33;
`;
export const RecentMap = styled.div`
    margin: 2.125rem 1rem;

    .text-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.3125rem;
        color: #fff;
        letter-spacing: 0.0075rem;
        line-height: 0.89;

        .title {
            font-size: 1.125rem;
        }

        .see-more {
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
        }
    }

    .map-area {
        display: flex;
        height: fit-content;
        flex-wrap: wrap;
    }
`;

export const MapChip = styled.div`
    display: flex;
    width: fit-content;
    height: 1.875rem;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-right: 0.375rem;
    margin-bottom: 0.375rem;
    background-color: #fff;
    border-radius: 1.125rem;
    color: #666666;
    cursor: pointer;

    .map-name {
        overflow: hidden;
        max-width: 170px;
        font-size: 0.875rem;
        letter-spacing: 0.00625rem;
        line-height: 1.14;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const Maps = styled.div`
    margin-top: 2.25rem;
    margin-right: 1rem;
    margin-left: 1rem;

    .title-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;

        .title {
            color: #000;
            font-size: 1.125rem;
            font-weight: bold;
            letter-spacing: 0.0075rem;
            line-height: 0.89;
        }

        .see-more {
            color: ${Palette.Grey[500]};
            cursor: pointer;
            font-size: 0.875rem;
            letter-spacing: 0.00625rem;
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
    width: 100%;
    max-width: calc(${Dimension.MaxWidth} - 2rem);
    justify-content: flex-end;
`;

export const NewBtn = styled.div`
    display: flex;
    width: 3.375rem;
    height: 3.375rem;
    align-items: center;
    justify-content: center;
    background-color: #008fff;
    border-radius: 1.875rem;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.006875rem;
`;
