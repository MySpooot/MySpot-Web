import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const Info = styled.article`
    display: flex;
    flex-direction: column;
`;

export const PlaceName = styled.h3``;

export const Footer = styled.footer`
    display: flex;
`;

export const BackButton = styled.button`
    cursor: pointer;
`;

export const ViewKakaoButton = styled.button`
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #008fff;
    border-radius: 0.25rem;
    cursor: pointer;
`;
