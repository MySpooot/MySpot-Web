import styled from '@emotion/styled';

import { Palette } from 'src/Constants';
import Icon from '../Icon';

export const Container = styled.div<{ up: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: ${({ up }) => (up ? '20rem' : '4.5rem')};
    width: 100%;
    transition: bottom 0.5s;
`;

export const Wrapper = styled.div`
    background-color: ${Palette.White};
    padding: 1rem;
    box-sizing: border-box;
    width: calc(100% - 2rem);
    margin: 0 1rem;
    border-radius: 0.375rem;

    .title {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
    }

    .address {
        color: ${Palette.Grey[500]};
        font-size: 0.75rem;
        margin-top: 0.25rem;
    }

    .road-address {
        display: flex;
        align-items: center;
        color: ${Palette.Grey[500]};
        font-size: 0.75rem;
        margin-top: 0.25rem;

        .label {
            border: 1px solid ${Palette.Grey[500]};
            padding: 0 0.25rem;
            line-height: 130%;
            border-radius: 0.25rem;
            margin-right: 0.25rem;
        }
    }
`;

export const EqRightIcon = styled(Icon)`
    width: 1.125rem;
    height: 1.125rem;
`;
