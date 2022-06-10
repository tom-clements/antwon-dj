import { RoomDto } from 'room/dtos/RoomDto';
import { RoomModel } from 'room/model/RoomModel';

export const mapRoomFromDto = (dto: RoomDto): RoomModel => ({
    roomId: dto.room_guid,
    code: dto.room_code,
    owner: dto.user_username,
});
