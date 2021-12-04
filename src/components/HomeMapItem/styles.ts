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
