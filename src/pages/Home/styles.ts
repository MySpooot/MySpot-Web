import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

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
    background-color: ${Color.white};
    overflow-y: auto;

    .desc {
        padding-bottom: 3rem;
        margin-top: 0.75rem;
        color: rgb(127, 127, 127);
        font-size: 1rem;
    }
`;

export const Top = styled.div`
    background-color: ${Color.blue};
    border-radius: 0 0 0 2.125rem;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.625rem;
    margin-top: 1.75rem;

    .myspot-logo {
        width: 7.9rem;
        height: 1.875rem;
    }
`;

export const MyPageIcon = styled(Icon)`
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 1.25rem;
    cursor: pointer;
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
    align-items: center;
    padding: 0 1.2rem;
    margin-top: 3.875rem;
    margin-bottom: 3.625rem;
    color: ${Color.white};
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.625rem;
`;

export const UserThumbnail = styled(Icon)`
    width: 2.875rem;
    height: 2.875rem;
    margin-right: 1.1rem;
    border-radius: 2.25rem;
`;

export const RecentMap = styled.div`
    .section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px 20px;
        color: ${Color.white};
        line-height: 0.89;

        .title {
            font-size: 1.125rem;
            font-weight: 500;
            line-height: 1.25rem;
        }

        .more-map {
            display: flex;
            align-items: center;
            color: #aee2ff;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.625rem;
            text-align: right;
        }
    }
`;

export const MoreRecentMapIcon = styled(Icon)`
    width: 1.125rem;
    height: 1.25rem;
`;

export const MapArea = styled.div`
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
    margin: 0 1.25rem 1rem 1.25rem;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    .no-recent-map {
        margin-bottom: 1.25rem;
        color: #88cbff;
    }
`;

export const MapChip = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 0.75rem 0.875rem;
    margin-right: 0.375rem;
    background-color: ${Color.white};
    border-radius: 1.125rem;
    color: ${Color.grey[600]};
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
    text-align: center;
`;

export const MapSpace = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 4rem;
`;

export const NewButton = styled(Icon)`
    position: fixed;
    z-index: 10;
    right: 0.7rem;
    bottom: 1rem;
    width: 5.25rem;
    height: 5.25rem;
    cursor: pointer;
`;
