import React, { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import { useModalState } from 'src/atoms';
import Button from 'src/components/Button';
import { Color } from 'src/Constants';
import { newlineToBr } from 'src/util/string';

const useModal = () => {
    const { setModal } = useModalState();

    const modalContainer = useRef(document.getElementById('modal-root')!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    const resolveFuncRef = useRef<(value: boolean) => void>();

    const onButtonClick = useCallback(
        (flag: boolean) => {
            resolveFuncRef.current?.(flag);
            setModal(undefined);
        },
        [setModal]
    );

    const alert = useCallback(
        (text: string) => {
            const portal = () => () =>
                createPortal(
                    <ModalBackground>
                        <ContentsWrapper>
                            <Message>{newlineToBr(text)}</Message>
                            <ButtonWrapper>
                                <Button type='primary' onClick={() => onButtonClick(true)}>
                                    확인
                                </Button>
                            </ButtonWrapper>
                        </ContentsWrapper>
                    </ModalBackground>,
                    modalContainer.current
                );

            setModal(portal);

            return new Promise(resolve => {
                resolveFuncRef.current = resolve;
            });
        },
        [onButtonClick, setModal]
    );

    const confirm = useCallback(
        (text: string) => {
            const portal = () => () =>
                createPortal(
                    <ModalBackground>
                        <ContentsWrapper>
                            <Message>{newlineToBr(text)}</Message>
                            <ButtonWrapper>
                                <Button style={{ marginRight: '1rem' }} type='primary' onClick={() => onButtonClick(true)}>
                                    확인
                                </Button>
                                <Button onClick={() => onButtonClick(false)}>취소</Button>
                            </ButtonWrapper>
                        </ContentsWrapper>
                    </ModalBackground>,
                    modalContainer.current
                );

            setModal(portal);

            return new Promise(resolve => {
                // resolveFunc = resolve;
                resolveFuncRef.current = resolve;
            });
        },
        [onButtonClick, setModal]
    );

    return { alert, confirm };
};

export default useModal;

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
    margin-top: 2.5rem;
`;
