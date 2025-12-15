import { Model } from "mongoose";
import { Music, MusicDocument } from "./schemas/music.schema";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
export declare class MusicService {
    private readonly musicModel;
    constructor(musicModel: Model<MusicDocument>);
    create(createMusicDto: CreateMusicDto): Promise<Music>;
    findAll(id?: string, categories?: string, isPremium?: boolean, active?: boolean): Promise<Music[]>;
    findOne(id: string): Promise<Music>;
    update(id: string, updateMusicDto: UpdateMusicDto): Promise<Music>;
    remove(id: string): Promise<void>;
    incrementPlays(id: string): Promise<Music>;
    findCategories(): Promise<string[]>;
}
