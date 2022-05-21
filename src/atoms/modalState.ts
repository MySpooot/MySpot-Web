import { FC } from 'react';
import { atom, useAtom } from 'jotai';

const modalState = atom<FC | undefined>(undefined);

export const useModalState = () => {
    const [Modal, setModal] = useAtom(modalState);

    return { Modal, setModal };
};
