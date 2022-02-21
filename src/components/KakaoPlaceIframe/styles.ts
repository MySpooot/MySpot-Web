import styled from '@emotion/styled';

export const Container = styled.div`
    position: absolute;
    z-index: 21;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;

    iframe {
        width: 100%;
        height: 95%;
    }

    div {
        height: 5%;
        background-color: white;
        color: black;
    }
`;
