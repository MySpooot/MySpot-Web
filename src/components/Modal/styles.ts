import styled from '@emotion/styled';

export const Container = styled.div<{ open: boolean | undefined }>`
    position: absolute;
    z-index: 99;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: ${props => (props.open ? 'flex' : 'none')};
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 10rem;
    flex-direction: column;
    align-items: center;
`;
