import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Color } from 'src/Constants';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: 'primary' | 'bordered' | 'default';
    fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({ type = 'default', fullWidth = true, children, ...props }) => (
    <Container fullWidth={fullWidth} type_={type} {...props}>
        {children}
    </Container>
);

const Container = styled.button<{ type_: 'primary' | 'bordered' | 'default'; fullWidth: boolean }>`
    display: flex;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    height: 3rem;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.11px;
    line-height: 2;
    user-select: none;

    ${props => {
        switch (props.type_) {
            case 'primary':
                return css`
                    background-color: ${Color.blue};
                    color: ${Color.white};
                `;
            case 'bordered':
                return css`
                    background-color: none;
                    color: ${Color.blue};
                    border: 1px solid ${Color.blue};
                `;
            default:
                return css`
                    background-color: none;
                    color: ${Color.grey[600]};
                    border: 1px solid ${Color.grey[300]};
                `;
        }
    }}

    :disabled {
        border: unset;
        background-color: ${Color.grey[100]};
        color: ${Color.grey[600]};
    }
`;

export default Button;
