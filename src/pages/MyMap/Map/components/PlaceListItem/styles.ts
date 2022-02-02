import styled from '@emotion/styled';

import { Palette } from 'src/Constants';

export const Container = styled.div`
    padding: 1.25rem 0;
    border-bottom: 0.375rem solid ${Palette.Grey[200]};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;
