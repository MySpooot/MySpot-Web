import styled from '@emotion/styled';
// main by haeun
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 48rem;
    height: 100vh;
`;

export const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    overflow-y: scroll;

    .desc {
        font-size: 1rem;
        margin-top: 0.75rem;
        color: rgb(127, 127, 127);
        padding-bottom: 3rem;
    }
`;

export const Header = styled.header`
    font-size: 2rem;
    font-weight: bold;
    height: 5rem;

    .myspot-logo {
        padding-top: 1.5rem;
        width: 7.75rem;
    }
`;

export const WelcomeSection = styled.div`
    font-size: 2rem;
    display: flex;
    width: 100%;
    padding-top: 3rem;
    justify-content: space-between;

    .mypage-img {
        width: 3.75rem;
        height: 3.75rem;
        cursor: pointer;
    }
`;

export const User = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    line-height: 3rem;
    padding-top: 0.5rem;
    b {
        font-weight: 700;
    }
    span {
        font-weight: 200;
    }
`;

export const Maps = styled.div`
    height: 32rem;
    .title-area {
        display: flex;
        align-items: center;
        margin-top: 3.75rem;
        .title {
            font-size: 1rem;
            padding-right: 0.75rem;
            padding-top: 0.3rem;
        }
    }
    .map-area {
        display: flex;
        padding-top: 0.75rem;
    }
`;

export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    z-index: 10;
    position: absolute;
    bottom: 1.25rem;
`;
export const NewBtn = styled.div`
    width: 48rem;
    height: 3.5rem;
    color: #ffffff;
    background-color: rgb(51, 51, 51);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
