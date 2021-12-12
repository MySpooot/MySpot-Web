import { atom } from 'recoil';

interface Me {
    id: number;
    nickname: string;
    thumbnail?: string;
}

export const meState = atom<Me | undefined>({
    key: 'meState',
    default: undefined
});
