import styled from '@emotion/styled';

import { Color, Dimension } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    width: 100%;
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
    max-height: 19.5rem;
    background-color: #008fff;
    border-radius: 0 0 0 2.125rem;
`;

export const Header = styled.header`
    display: flex;
    height: 3.125rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.625rem;

    .myspot-title {
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 0.01rem;
        line-height: 1.33;
    }

    .mypage-img {
        width: 2rem;
        height: 2rem;
        border-radius: 1.25rem;
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
    height: 8rem;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.625rem;
    letter-spacing: 0.1647060066461563px;
    padding: 2.5rem 1.2rem;
    align-items: center;

    .user-img {
        width: 2.875rem;
        height: 2.875rem;
        margin-right: 1.1rem;
        border-radius: 2.25rem;
    }
`;
export const RecentMap = styled.div`
    .section-title {
        display: flex;
        justify-content: space-between;
        color: #fff;
        letter-spacing: 0.0075rem;
        line-height: 0.89;
        padding: 20px;
        align-items: center;

        .title {
            font-size: 1.125rem;
            font-weight: 700;
            line-height: 1.25rem;
            letter-spacing: 0.12352950125932693px;
            text-align: left;
        }

        .more-map {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.625rem;
            letter-spacing: 0.1647060066461563px;
            text-align: right;
            color: #aee2ff;

            img {
                width: 1.125rem;
                height: 1.25rem;
            }
        }
    }
`;

export const MapArea = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin: 0 1.25rem 1rem 1.25rem;
    overflow: scroll;
    overflow: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    .no-recent-map {
        color: #88cbff;
        margin-bottom: 1.25rem;
    }
`;

export const MapChip = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    margin-right: 0.375rem;
    margin-bottom: 0.375rem;
    background-color: #fff;
    border-radius: 1.125rem;
    color: #7f7f7f;
    cursor: pointer;
    font-size: 0.875rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.09607850015163422px;
    text-align: center;
    padding: 0.75rem 0.875rem;
`;

export const ContentSpace = styled.div`
    height: 100%;
`;

export const EmptySpace = styled.div`
    display: flex;

    .content {
        flex-direction: column;
        display: flex;
        margin-top: 4.375rem;
        width: 100%;
        height: fit-content;
        align-items: center;
        justify-content: center;
        img {
            width: 24.5rem;
            height: 10.3rem;
            margin-bottom: 2.125rem;
        }
        div {
            font-size: 1.125rem;
            line-height: 1.375rem;
            color: #d3d3d3;
            text-align: center;
        }
    }
`;

export const MapSpace = styled.div`
    display: flex;
    flex-direction: column;
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
            color: ${Color.grey[500]};
            cursor: pointer;
            font-size: 0.875rem;
            letter-spacing: 0.00625rem;
            line-height: 1.14;
            display: flex;
            align-items: center;
            img {
                width: 1.125rem;
                height: 1.25rem;
            }
        }
    }

    .map-area {
        display: flex;
        flex-direction: column;
    }
`;

export const NewBtn = styled.div`
    position: absolute;
    bottom: 5rem;
    right: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eff6fd;
    border-radius: 3rem;
    color: #fff;
    cursor: pointer;
    z-index: 10;

    img {
        width: 5.25rem;
        height: 5.25rem;
    }
`;
