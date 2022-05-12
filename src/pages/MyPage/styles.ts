import styled from '@emotion/styled';
import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
`;

export const Header = styled.div`
    padding: 2rem;
`;
export const UserInfo = styled.div`
    display: flex;
    min-height: 8.25rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;

export const User = styled.div`
    display: flex;
    align-items: center;

    .user-txt {
        margin-left: 18px;
    }

    .profile_img {
        display: none;
    }

    img {
        width: 1.5rem;
        cursor: pointer;
    }
`;

export const InputImg = styled.div`
    position: relative;
    cursor: pointer;

    .mypage-img {
        width: 3.375rem;
        height: 3.375rem;
        border-radius: 1.6875rem;
    }

    .upload-img {
        position: absolute;
        z-index: 10;
        top: 51.5%;
        left: 63%;
        width: 1.5rem;
    }
`;

export const UpdateBtn = styled.button`
    width: 2.5rem;
    height: 1.25rem;
    border: solid 1px ${Color.grey[300]};
    background-color: ${Color.white};
    border-radius: 4px;
    color: ${Color.grey[500]};
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: -0.17px;
`;

export const SavedTitle = styled.div`
    margin-bottom: 0.75rem;
    margin-left: 1rem;
    color: ${Color.grey[500]};
`;

export const LogoutBtn = styled.button`
    width: 4rem;
    border: none;
    background-color: ${Color.white};
    color: ${Color.grey[500]};
    cursor: pointer;
    font-size: 0.75rem;
`;

export const Locations = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 16px solid ${Color.grey[100]};
    background-color: ${Color.grey[100]};
    overflow-y: auto;
`;

export const LocationCard = styled.div`
    display: flex;
    width: 100%;
    height: 8.6rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: solid 1px ${Color.grey[100]};
    background-color: ${Color.white};
    cursor: pointer;

    .location-address {
        margin-bottom: 0.5rem;
        color: ${Color.black};
        font-size: 1rem;
        font-weight: 400;
    }

    .location-title {
        margin-bottom: 0.5rem;
        color: ${Color.black};
        font-size: 1.25rem;
    }

    .address {
        display: flex;
        width: 1.6875rem;
        height: 0.9375rem;
        align-items: center;
        justify-content: center;
        border: solid 1px ${Color.grey[400]};
        margin-right: 0.25rem;
        border-radius: 0.1875rem;
        color: #bebebe;
        font-size: 0.625rem;
    }

    .jibun-address {
        margin-bottom: 0.5rem;
        color: ${Color.grey[500]};
        font-size: 0.85rem;
    }
`;
