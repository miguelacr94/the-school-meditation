import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { FindMusicQueryDto } from "./dto/find-music.dto";
import { Music } from "./schemas/music.schema";
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    create(dto: CreateMusicDto): Promise<Music>;
    findAll(query: FindMusicQueryDto): Promise<Music[]>;
    findOne(id: string): Promise<Music>;
    update(id: string, dto: UpdateMusicDto): Promise<Music>;
    remove(id: string): Promise<void>;
    incrementPlays(id: string): Promise<Music>;
}
