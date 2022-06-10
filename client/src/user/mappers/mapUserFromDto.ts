import { UserDto } from 'user/dtos/UserDto';
import { UserModel } from 'user/model/UserModel';

export const mapUserFromDto = (dto: UserDto): UserModel => ({
    name: dto.name,
    username: dto.username,
    imageUrl: dto.picture ?? undefined,
    roomCode: dto.room_code ?? undefined,
});
