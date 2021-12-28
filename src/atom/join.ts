import { atom } from 'recoil';

interface Join {
    id: number;
    nickname: string;
}

export const joinState = atom<Join | undefined>({
    key: 'joinState',
    default: undefined
});
