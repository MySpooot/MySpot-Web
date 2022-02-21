import styled from '@emotion/styled';

import { Palette } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div<{ up: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: ${({ up }) => (up ? '20rem' : '4.5rem')};
    width: 100%;
    transition: bottom 0.5s;
`;

export const Wrapper = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    height: 6.875rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    margin: 0 1rem;
    background-color: ${Palette.White};
    border-radius: 0.375rem;

    .title {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
    }

    .address {
        margin: 0.25rem 0;
        color: ${Palette.Grey[500]};
        font-size: 0.75rem;
    }

    .road-address {
        display: flex;
        align-items: center;
        margin-top: 0.25rem;
        color: ${Palette.Grey[500]};
        font-size: 0.75rem;

        .label {
            padding: 0 0.25rem;
            border: 1px solid ${Palette.Grey[500]};
            margin-right: 0.25rem;
            border-radius: 0.25rem;
            line-height: 130%;
        }
    }
`;

export const BookMarkIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.375rem;
`;

export const EqRightIcon = styled(Icon)`
    width: 1.125rem;
    height: 1.125rem;
`;
