export type GetMeResponse = {
    id: number;
    nickname: string;
    thumbnail?: string;
};

// 가입함 + 닉네임입력 -> 토큰있음
// 가입함 + 닉네임입력안함 -> 토큰없음
// 아예 첫 가입 -> 닉네임 입력 전이라 토큰 없음
export type LogInResponse = {
    id: number;
    nickname: string;
    thumbnail?: string;
    active?: number;
    token?: string;
};

export type UpdateUserNicknameResponse = {
    id: number;
    nickname: string;
    thumbnail: string;
    active: number;
    token: string;
};
