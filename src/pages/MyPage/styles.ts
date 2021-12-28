import styled from '@emotion/styled';
import { HiUser } from 'react-icons/hi';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    padding: 0 1.5rem;
`;

export const Header = styled.div`
    padding: 2rem;
`;
export const UserInfo = styled.div`
    display: flex;
    height: 35%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;

export const UserNickname = styled.div`
    display: flex;
    width: 100%;
    height: 20%;
    justify-content: space-between;
    font: bold;
    font-size: 1.5rem;

    .nickname-update {
        display: flex;
        width: 60%;
        justify-content: flex-start;
    }
`;

export const LogoutBtn = styled.button`
    width: 7rem;
    padding: 1rem 2rem;
    border: none;
    background-color: #fee500;
    cursor: pointer;
`;

export const UserImg = styled(HiUser)`
    width: 5rem;
    height: 5rem;
`;

export const UserTab = styled.div`
    display: flex;
    height: 40%;
    flex-direction: column;
    padding: 0 1.5rem;

    .tabs {
        display: flex;
        width: 200px;
        height: 200px;

        h2 {
            margin: 1rem;
            pointer: cursor;
        }
    }
`;

export const Tab = styled.div<{ active: boolean }>`
    height: 500px;
    background-color: #e4e9e8;
    opacity: ${({ active }) => (active ? 1 : 0)};

    .boxed {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        font-weight: bold;
    }
`;
