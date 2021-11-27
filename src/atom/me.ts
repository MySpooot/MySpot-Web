import { atom } from 'recoil';

interface Me {
    id: number;
    name: string;
    thumbnail?: string;
}

export const meState = atom<Me | undefined>({
    key: 'meState',
    default: undefined
});
