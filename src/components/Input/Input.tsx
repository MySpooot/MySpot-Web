import React, { FC, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import useKeyPress from 'src/hooks/useKeyPress';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
    onEnterPress?: () => void;
}

const Input: FC<InputProps> = ({ fullWidth = true, onEnterPress, style, children, ...props }) => {
    const { keyPressRef } = useKeyPress<HTMLInputElement>('Enter', () => onEnterPress?.(), { runOnlyFocusedElement: true });

    return (
        <Container fullWidth={fullWidth} style={style}>
            <InputBox ref={keyPressRef} {...props} />
            {children}
        </Container>
    );
};

const Container = styled.div<{ fullWidth: boolean }>`
    display: flex;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    height: 3rem;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border: 1px solid ${Color.grey[300]};
    border-radius: 0.25rem;
`;

const InputBox = styled.input`
    width: 100%;
    border: none;
    outline: none;

    &::placeholder {
        color: ${Color.grey[400]};
    }
`;

export default Input;
