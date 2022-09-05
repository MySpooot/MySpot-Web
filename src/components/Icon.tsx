import styled, { StyledComponent } from '@emotion/styled';
import { ComponentType, HTMLAttributes } from 'react';

export interface IconProps extends HTMLAttributes<HTMLImageElement> {
    src?: File | string;
}

const Icon: StyledComponent<ComponentType<IconProps>, any, IconProps> = styled.img<IconProps>`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export default Icon;
