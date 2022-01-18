import styled from '@emotion/styled';
// main by haeun
export const HContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

export const HHeader = styled.header`
    font-size: 2rem;
    font-weight: bold;
    height: 80px;
`;

export const WelcomeSection = styled.div`
    font-size: 2rem;
    display: flex;
    width: 100%;
    padding-top: 50px;
`;

export const Desc = styled.div`
    font-size: 1rem;
    margin-top: 12px;
    color: rgb(127, 127, 127);
    padding-bottom: 50px;
`;

export const User = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    line-height: 3rem;
    width: 748px;
    padding-top: 6px;
`;

export const Maps = styled.div`
    height: 500px;
    .title-area {
        display: flex;
        align-items: center;
        margin-top: 60px;
    }
`;

export const NewBtn = styled.div`
    width: 100%;
    height: 56px;
    color: #ffffff;
    background-color: rgb(51, 51, 51);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
