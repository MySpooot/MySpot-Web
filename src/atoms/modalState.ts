import { atom, useAtom } from 'jotai';
import { FC } from 'react';

const modalState = atom<FC | undefined>(undefined);

export const useModalState = () => {
    const [Modal, setModal] = useAtom(modalState);

    return { Modal, setModal };
};
