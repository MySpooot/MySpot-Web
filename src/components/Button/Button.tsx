import React, { ButtonHTMLAttributes, FC } from 'react';
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
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.11px;
    line-height: 2;
    height: 3rem;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    border-radius: 0.25rem;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;

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
                    color: ${Color.grey[300]};
                    border: 1px solid ${Color.grey[300]};
                `;
        }
    }}

    :disabled {
        background-color: ${Color.grey[100]};
        color: ${Color.grey[600]};
        border: unset;
    }
`;

export default Button;
