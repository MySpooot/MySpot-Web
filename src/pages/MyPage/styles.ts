import styled from '@emotion/styled';
import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    width: 28.125rem;
    height: 100vh;
    flex-direction: column;
`;

export const Header = styled.div`
    padding: 2rem;
`;
export const UserInfo = styled.div`
    display: flex;
    min-height: 6.25rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;

export const User = styled.div`
    display: flex;
    align-items: center;

    .mypage-img {
        width: 3.375rem;
        height: 3.375rem;
        border-radius: 1.6875rem;
    }

    .user-txt {
        margin-right: 14px;
        margin-left: 18px;
    }
`;

export const UpdateBtn = styled.button`
    width: 2.625rem;
    height: 1.25rem;
    border: solid 1px ${Color.grey[300]};
    background-color: ${Color.white};
    border-radius: 4px;
    color: ${Color.grey[500]};
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: -0.17px;
`;

export const LogoutBtn = styled.button`
    border: none;
    background-color: ${Color.white};
    color: ${Color.grey[500]};
    cursor: pointer;
    font-size: 0.75rem;
`;

export const Locations = styled.div`
    display: flex;
    height: 44.4375rem;
    flex-direction: column;
    padding: 1rem 1.25rem;
    background-color: ${Color.grey[100]};
`;

export const LocationCard = styled.div`
    display: flex;
    width: 25.6rem;
    justify-content: space-between;
    padding: 1.25rem 1.125rem;
    margin-bottom: 0.75rem;
    background-color: ${Color.white};
    border-radius: 0.375rem;
    cursor: pointer;

    .location-address {
        margin-bottom: 0.1875rem;
        color: #7f7f7f;
        font-size: 0.75rem;
        letter-spacing: -0.010625rem;
    }

    .location-title {
        margin-bottom: 0.25rem;
        color: #333333;
        font-size: 1rem;
        letter-spacing: -0.014375rem;
    }

    .address {
        display: flex;
        width: 1.6875rem;
        height: 0.9375rem;
        align-items: center;
        justify-content: center;
        border: solid 1px #e8e8e8;
        margin-right: 0.25rem;
        border-radius: 0.1875rem;
        color: #bebebe;
        font-size: 0.625rem;
        letter-spacing: -0.00875rem;
    }
`;
