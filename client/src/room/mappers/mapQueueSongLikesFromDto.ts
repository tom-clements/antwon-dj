import { mapValues } from 'lodash';
import { mapSongLikesFromDto } from 'room/mappers/mapSongLikesFromDto';
import type { QueueSongLikesModel } from 'room/model/QueueSongLikesModel';
import type { QueueSongLikesDto } from 'room/dtos/QueueSongLikesDto';

export const mapQueueSongLikesFromDto = (dto: QueueSongLikesDto): QueueSongLikesModel =>
    mapValues(dto, mapSongLikesFromDto);
