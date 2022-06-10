import type { UserModel } from 'user/model/UserModel';

type MockUserModels = Record<string, UserModel | null>;

export const createMockUserModels = (): MockUserModels => ({
    anonymous: null,
    justName: {
        name: 'Ablert Clements',
        username: 'username',
    },
    nameAndImageUrl: {
        name: 'Ablert Clements',
        username: 'username',
        imageUrl: 'https://mui.com/static/images/avatar/1.jpg',
    },
    nameImageAndRoom: {
        name: 'Ablert Clements',
        username: 'username',
        imageUrl: 'https://mui.com/static/images/avatar/1.jpg',
        roomCode: 'SOIREE',
    },
});
