import React, { FC, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import useKeyPress from 'src/hooks/useKeyPress';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
    onEnterPress?: () => void;
}

const Input: FC<InputProps> = ({ fullWidth = true, onEnterPress, children, ...props }) => {
    const { keyPressRef } = useKeyPress<HTMLInputElement>('Enter', () => onEnterPress?.(), { runOnlyFocusedElement: true });

    return (
        <Container ref={keyPressRef} fullWidth={fullWidth} {...props}>
            {children}
        </Container>
    );
};

const Container = styled.input<{ fullWidth: boolean }>`
    padding: 1rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid ${Color.grey[300]};
    outline: none;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

    &::placeholder {
        color: ${Color.grey[400]};
    }
`;

export default Input;
