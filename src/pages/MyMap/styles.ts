import styled from '@emotion/styled';
import { HiPlus, HiMinus } from 'react-icons/hi';

// import { BreakPoint } from '@src/Constants';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;

export const MapContainer = styled.div`
    width: 100%;
    flex-grow: 1;
`;

export const Map = styled.div`
    width: 100%;
    height: 100%;
`;

export const ButtonWrapper = styled.div`
    position: absolute;
    right: 5%;
    bottom: 5%;
    display: flex;
    flex-direction: column;
`;

export const Plus = styled(HiPlus)`
    cursor: pointer;
`;

export const Minus = styled(HiMinus)`
    cursor: pointer;
`;
