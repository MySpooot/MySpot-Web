import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    margin-top: 2.25rem;
    margin-right: 1rem;
    margin-left: 1rem;
`;

export const TitleArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;

    .title {
        color: ${Color.black};
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 0.89;
    }

    .see-more {
        display: flex;
        align-items: center;
        color: ${Color.grey[500]};
        cursor: pointer;
        font-size: 0.875rem;
        line-height: 1.14;
    }
`;

export const MapArea = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MoreButton = styled(Icon)`
    width: 1.125rem;
    height: 1.25rem;
`;
