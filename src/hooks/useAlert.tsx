import styled from '@emotion/styled';
import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Color } from 'src/Constants';
import { useModalState } from 'src/atoms';
import Button from 'src/components/Button';
import useKeyPress from 'src/hooks/useKeyPress';
import { newlineToBr } from 'src/util/string';

const useAlert = () => {
    const { setModal } = useModalState();

    const modalContainer = useRef(document.getElementById('modal-root')!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    const resolveFuncRef = useRef<(value: boolean) => void>();

    useKeyPress('Enter', () => onButtonClick(true));
    useKeyPress('Escape', () => onButtonClick(false));

    const onButtonClick = useCallback(
        (flag: boolean) => {
            resolveFuncRef.current?.(flag);
            setModal(undefined);
        },
        [setModal]
    );

    const Modal = useCallback(({ children }) => {
        return createPortal(
            <ModalBackground>
                <ContentsWrapper>{children}</ContentsWrapper>
            </ModalBackground>,
            modalContainer.current
        );
    }, []);

    const alert = useCallback(
        (text: string) => {
            const modal = () => (
                <Modal>
                    <Message>{newlineToBr(text)}</Message>
                    <ButtonWrapper>
                        <Button type='primary' popup onClick={() => onButtonClick(true)}>
                            확인
                        </Button>
                    </ButtonWrapper>
                </Modal>
            );

            setModal(() => modal);

            return new Promise(resolve => {
                resolveFuncRef.current = resolve;
            });
        },
        [Modal, onButtonClick, setModal]
    );

    const confirm = useCallback(
        (text: string) => {
            const modal = () => (
                <Modal>
                    <Message>{newlineToBr(text)}</Message>
                    <ButtonWrapper>
                        <Button style={{ marginRight: '1rem' }} type='primary' popup onClick={() => onButtonClick(true)}>
                            확인
                        </Button>
                        <Button popup onClick={() => onButtonClick(false)}>
                            취소
                        </Button>
                    </ButtonWrapper>
                </Modal>
            );

            setModal(() => modal);

            return new Promise(resolve => {
                resolveFuncRef.current = resolve;
            });
        },
        [Modal, onButtonClick, setModal]
    );

    useEffect(() => {
        return () => setModal(undefined);
    }, [setModal]);

    return { alert, confirm };
};

export default useAlert;

const ModalBackground = styled.div`
    position: fixed;
    z-index: 99999;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
`;

const ContentsWrapper = styled.div`
    width: 95%;
    padding: 2rem 1.5rem;
    border: 1px solid ${Color.grey[300]};
    background-color: ${Color.white};
    border-radius: 0.25rem;
`;

const Message = styled.div`
    line-height: 150%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 1.5rem;
`;
