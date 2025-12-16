import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Video, VideoDocument } from "./schemas/video.schema";
import { VideoPage, VideoItem } from "./interfaces/video.interface";
import { FindVideoQueryDto } from "./dto/find-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
  ) {}

  async findAll(query: FindVideoQueryDto): Promise<VideoPage> {
    const {
      page,
      limit,
      id,
      isPremium,
      isActive,
      title,
      description,
      type,
      views,
      position,
    } = query;

    // Build query filter
    const filter: {
      _id?: string;
      categories?: string;
      isPremium?: boolean;
      isActive?: boolean;
      title?: { $regex: string; $options: string };
      description?: { $regex: string; $options: string };
      videoUrl?: { $regex: string; $options: string };
      thumbnailUrl?: { $regex: string; $options: string };
      type?: string;
      views?: number;
      position?: number;
    } = {};

    if (id) {
      filter._id = id;
    }

    if (type) {
      filter.type = type;
    }

    if (isPremium !== undefined) {
      filter.isPremium = isPremium === "true";
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }

    if (views !== undefined) {
      filter.views = views;
    }

    if (position !== undefined) {
      filter.position = position;
    }

    // Check if pagination is provided
    const hasPagination = page !== undefined && limit !== undefined;

    let data: VideoDocument[];
    let total: number;

    if (hasPagination) {
      const currentPage = page && page > 0 ? page : 1;
      const currentPageSize = limit && limit > 0 ? limit : 20;
      const skip = (currentPage - 1) * currentPageSize;

      [data, total] = await Promise.all([
        this.videoModel
          .find(filter)
          .sort({ isPremium: 1, position: 1, createdAt: -1 })
          .skip(skip)
          .limit(currentPageSize)
          .exec(),
        this.videoModel.countDocuments(filter).exec(),
      ]);
    } else {
      // No pagination - return all results
      data = await this.videoModel
        .find(filter)
        .sort({ isPremium: 1, position: 1, createdAt: -1 })
        .exec();
      total = data.length;
    }

    const videoList: VideoItem[] = data.map(
      (video): VideoItem => ({
        _id: video._id.toString(),
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl,
        type: video.type,
        position: video.position || 0,
        isPremium: video.isPremium,
        isActive: video.isActive,
        views: video.views || 0,
        createdAt: video.createdAt
          ? new Date(video.createdAt).toISOString()
          : "",
        updatedAt: video.updatedAt
          ? new Date(video.updatedAt).toISOString()
          : "",
        __v: 0,
      }),
    );

    const totalPages = hasPagination
      ? Math.ceil(total / (limit && limit > 0 ? limit : 10))
      : 1;
    const hasAnyPremium = videoList.some((item) => item.isPremium);

    return {
      videoList,
      isPremium: hasAnyPremium,
      totalCount: total,
      currentPage: hasPagination ? (page && page > 0 ? page : 1) : 1,
      totalPages,
    };
  }

  async findOne(id: string): Promise<VideoItem | null> {
    const video = await this.videoModel.findById(id).exec();

    if (!video) {
      return null;
    }

    return {
      ...video.toObject(),
      _id: video._id.toString(),
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      type: video.type,
      position: video.position || 0,
      isPremium: video.isPremium,
      isActive: video.isActive,
      views: video.views || 0,
      createdAt: video.createdAt ? new Date(video.createdAt).toISOString() : "",
      updatedAt: video.updatedAt ? new Date(video.updatedAt).toISOString() : "",
      __v: 0,
    };
  }

  async create(createVideoDto: any): Promise<VideoItem> {
    const newVideo = new this.videoModel(createVideoDto);
    const savedVideo = await newVideo.save();

    return {
      ...savedVideo.toObject(),
      _id: savedVideo._id.toString(),
      title: savedVideo.title,
      description: savedVideo.description,
      videoUrl: savedVideo.videoUrl,
      thumbnailUrl: savedVideo.thumbnailUrl,
      type: savedVideo.type,
      position: savedVideo.position || 0,
      isPremium: savedVideo.isPremium,
      isActive: savedVideo.isActive,
      views: savedVideo.views || 0,
      createdAt: savedVideo.createdAt
        ? new Date(savedVideo.createdAt).toISOString()
        : "",
      updatedAt: savedVideo.updatedAt
        ? new Date(savedVideo.updatedAt).toISOString()
        : "",
      __v: 0,
    };
  }

  async update(
    id: string,
    updateVideoDto: UpdateVideoDto,
  ): Promise<VideoItem | null> {
    const updatedVideo = await this.videoModel
      .findByIdAndUpdate(id, updateVideoDto, { new: true })
      .exec();

    if (!updatedVideo) {
      return null;
    }

    return {
      ...updatedVideo.toObject(),
      _id: updatedVideo._id.toString(),
      title: updatedVideo.title,
      description: updatedVideo.description,
      videoUrl: updatedVideo.videoUrl,
      thumbnailUrl: updatedVideo.thumbnailUrl,
      type: updatedVideo.type,
      position: updatedVideo.position || 0,
      isPremium: updatedVideo.isPremium,
      isActive: updatedVideo.isActive,
      views: updatedVideo.views || 0,
      createdAt: updatedVideo.createdAt
        ? new Date(updatedVideo.createdAt).toISOString()
        : "",
      updatedAt: updatedVideo.updatedAt
        ? new Date(updatedVideo.updatedAt).toISOString()
        : "",
      __v: 0,
    };
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.videoModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async incrementViews(id: string): Promise<VideoItem | null> {
    const updatedVideo = await this.videoModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .exec();

    if (!updatedVideo) {
      return null;
    }

    return {
      ...updatedVideo.toObject(),
      _id: updatedVideo._id.toString(),
      title: updatedVideo.title,
      description: updatedVideo.description,
      videoUrl: updatedVideo.videoUrl,
      thumbnailUrl: updatedVideo.thumbnailUrl,
      type: updatedVideo.type,
      position: updatedVideo.position || 0,
      isPremium: updatedVideo.isPremium,
      isActive: updatedVideo.isActive,
      views: updatedVideo.views || 0,
      createdAt: updatedVideo.createdAt
        ? new Date(updatedVideo.createdAt).toISOString()
        : "",
      updatedAt: updatedVideo.updatedAt
        ? new Date(updatedVideo.updatedAt).toISOString()
        : "",
      __v: 0,
    };
  }
}
