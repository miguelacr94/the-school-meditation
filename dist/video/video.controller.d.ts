import { VideoService } from "./video.service";
import { FindVideoQueryDto } from "./dto/find-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { VideoPage, VideoItem } from "./interfaces/video.interface";
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    findAll(query: FindVideoQueryDto): Promise<VideoPage>;
    findOne(id: string): Promise<VideoItem | null>;
    create(createVideoDto: any): Promise<VideoItem>;
    update(id: string, updateVideoDto: UpdateVideoDto): Promise<VideoItem | null>;
    remove(id: string): Promise<boolean>;
    incrementViews(id: string): Promise<VideoItem | null>;
}
