import { Model } from "mongoose";
import { VideoDocument } from "./schemas/video.schema";
import { VideoPage, VideoItem } from "./interfaces/video.interface";
import { FindVideoQueryDto } from "./dto/find-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
export declare class VideoService {
    private readonly videoModel;
    constructor(videoModel: Model<VideoDocument>);
    findAll(query: FindVideoQueryDto): Promise<VideoPage>;
    findOne(id: string): Promise<VideoItem | null>;
    create(createVideoDto: any): Promise<VideoItem>;
    update(id: string, updateVideoDto: UpdateVideoDto): Promise<VideoItem | null>;
    remove(id: string): Promise<boolean>;
    incrementViews(id: string): Promise<VideoItem | null>;
}
