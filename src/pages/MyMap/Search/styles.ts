import styled from '@emotion/styled';

import { Palette } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;

    .input-wrapper {
        display: flex;
        flex-grow: 1;
        align-items: center;
        border: 1px solid ${Palette.Grey[300]};
        margin-right: 1rem;
        border-radius: 0.25rem;

        input {
            flex-grow: 1;
            padding: 0.875rem;
            border: none;
            outline: none;
        }

        .search {
            cursor: pointer;
        }
    }
`;

export const Main = styled.main`
    flex-grow: 1;
    overflow-y: auto;

    /* 스크롤바 전체 */
    ::-webkit-scrollbar {
        background-color: ${Palette.Black};
        width: 0.25rem;
    }

    /* 스크롤 막대 */
    ::-webkit-scrollbar-thumb {
        background-color: ${Palette.Grey[300]};
    }

    /* 스크롤 막대 외부 */
    ::-webkit-scrollbar-track {
        background-color: ${Palette.Grey[500]};
    }
`;

export const PlaceItem = styled.div`
    display: flex;
    padding: 1.25rem 1rem;
    border-bottom: 1px solid ${Palette.Grey[300]};
    align-items: center;

    .info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .name {
            font-weight: 500;
        }

        .address {
            margin-top: 0.25rem;
            font-size: 0.75rem;
            color: ${Palette.Grey[400]};
        }

        .road-address {
            margin-top: 0.25rem;
            display: flex;
            font-size: 0.75rem;
            align-items: center;

            .label {
                color: ${Palette.Grey[400]};
                margin-right: 0.25rem;
                border-radius: 0.25rem;
                padding: 0.125rem;
                border: 1px solid ${Palette.Grey[300]};
            }
        }

        .time {
            color: ${Palette.Blue[300]};
            font-size: 0.75rem;
            font-weight: 500;
        }
    }

    .right {
        background-color: ${Palette.Grey[200]};
        padding: 0.375rem 0.5rem;
        color: ${Palette.Grey[500]};
        border-radius: 0.25rem;
        cursor: pointer;
    }
`;

export const HeaderIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.5rem;
    cursor: pointer;
`;
