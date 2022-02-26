import styled from '@emotion/styled';

import { Color, ScrollbarStyle } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const Main = styled.main`
    ${ScrollbarStyle}
    display: flex;
    overflow: auto;
    flex-direction: column;
    flex-grow: 1;
`;

export const Info = styled.article`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    margin-top: 1.75rem;
`;

export const PlaceName = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.6;
`;

export const Address = styled.div`
    margin-top: 0.25rem;
    color: ${Color.grey[600]};
    font-size: 0.875rem;
`;

export const RoadAddressArea = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
`;

export const AddressLabel = styled.div`
    padding: 0.25rem;
    border: 1px solid ${Color.grey[200]};
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    color: ${Color.grey[400]};
    font-size: 0.625rem;
`;

export const RoadAddress = styled.div`
    color: ${Color.grey[600]};
    font-size: 0.75rem;
`;

export const TextArea = styled.textarea`
    padding: 1rem 0.75rem;
    border: 1px solid ${Color.grey[300]};
    margin-top: 1.75rem;
    border-radius: 0.25rem;
`;

export const RegisterButton = styled.button<{ active: boolean }>`
    padding: 0.5rem;
    margin-top: 0.875rem;
    background-color: ${({ active }) => (active ? Color.blue : Color.grey[100])};
    border-radius: 0.25rem;
    color: ${({ active }) => (active ? Color.white : Color.grey[600])};
    cursor: ${({ active }) => (active ? 'pointer' : 'auto')};
    font-weight: 500;
    line-height: 2;
`;

export const Line = styled.hr`
    width: 100%;
    height: 0.375rem;
    border: none;
    margin-top: 1.75rem;
    margin-bottom: 1.25rem;
    background-color: ${Color.grey[100]};
`;

export const ReviewArea = styled.article`
    display: flex;
    flex-direction: column;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 0.875rem;
`;

export const ReviewTitle = styled.h3`
    font-weight: bold;
`;

export const ReviewCount = styled.div`
    margin-left: 0.375rem;
    color: ${Color.blue};
    font-size: 0.875rem;
`;

export const ReviewList = styled.ul``;

export const NoReview = styled.div`
    padding: 2.5rem;
    text-align: center;
`;

export const Footer = styled.footer`
    display: flex;
    padding-top: 0.625rem;
    padding-bottom: 1.25rem;
`;

export const BackButton = styled.button`
    border: 1px solid ${Color.grey[300]};
    border-radius: 0.25rem;
    cursor: pointer;
`;

export const ViewKakaoButton = styled.button`
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid ${Color.blue};
    margin-left: 0.625rem;
    border-radius: 0.25rem;
    color: ${Color.blue};
    cursor: pointer;
    font-weight: 500;
    line-height: 2;
`;
