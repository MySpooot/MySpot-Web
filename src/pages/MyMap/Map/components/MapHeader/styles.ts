import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const HeaderIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

export const Title = styled.h1`
    font-weight: bold;
`;

export const RightArea = styled.div`
    display: flex;
    align-items: center;
`;

export const Tooltip = styled.div`
    position: absolute;
    z-index: 11;
    top: 0;
    width: 10rem;
    padding: 1rem 0.75rem;
    background-color: ${Color.blue};
    border-radius: 0.25rem;
    color: ${Color.white};
    transform: translate(-70%, 70%);

    :before {
        position: absolute;
        top: -0.5rem;
        right: 1.5rem;
        border-top: 0x solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${Color.blue};
        border-left: 10px solid transparent;
        content: '';
    }

    h3 {
        font-size: 0.75rem;
        line-height: 1.5;
    }

    div {
        font-size: 0.625rem;
        line-height: 1.3;
    }
`;
