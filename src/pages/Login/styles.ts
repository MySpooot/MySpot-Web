import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const LabelArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Title = styled.h1`
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
`;

export const Description = styled.h3`
    font-size: 0.875rem;
    text-align: center;
`;

export const LoginButton = styled.button`
    padding: 0.5rem 4.125rem;
    background-color: #fee500;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    line-height: 2.2;
`;
