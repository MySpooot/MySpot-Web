import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    display: flex;
    height: 50vh;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1.25rem;
`;

export const LoginIcon = styled(Icon)`
    width: 12.3125rem;
    height: 4rem;
    margin-bottom: 2.5rem;
`;

export const LabelArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
`;

export const Description = styled.h3`
    margin-bottom: 3.75rem;
    color: ${Color.grey[500]};
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 150%;
    text-align: center;
`;

export const LoginButton = styled.button`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 2rem;
    background-color: #fee500;
    border-radius: 0.25rem;
    cursor: pointer;
`;

export const KakaoIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.125rem;
    margin-right: 0.625rem;
`;

export const KakaoText = styled.span`
    font-size: 1.125rem;
    font-weight: 500;
`;
