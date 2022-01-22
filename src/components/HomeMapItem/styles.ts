import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    border-top: 1px solid black;
    cursor: pointer;

    :last-child {
        border-bottom: 1px solid black;
    }
`;
export const Card = styled.div`
    display: flex;
    width: 30%;
    height: 84px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 14px;
    background-color: rgb(190, 229, 201);
    border-radius: 8px;
    box-shadow: 0px 4px 10px 0px rgb(232, 232, 232);
    cursor: pointer;
`;
