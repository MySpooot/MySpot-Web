import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 4.375rem;
`;

export const ChulsuIcon = styled(Icon)`
    height: 10.3rem;
    margin-bottom: 2.125rem;
`;

export const EmptyText = styled.div`
    color: ${Color.grey[300]};
    font-size: 1.125rem;
    line-height: 1.375rem;
    text-align: center;
`;
