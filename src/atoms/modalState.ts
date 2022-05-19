import { ReactPortal } from 'react';
import { atom, useAtom } from 'jotai';

const modalState = atom<(() => ReactPortal) | undefined>(undefined);

export const useModalState = () => {
    const [Modal, setModal] = useAtom(modalState);

    return { Modal, setModal };
};
