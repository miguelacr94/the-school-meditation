"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("./schemas/video.schema");
let VideoService = class VideoService {
    videoModel;
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async findAll(query) {
        const { page, limit, id, isPremium, isActive, title, description, type, views, position, } = query;
        const filter = {};
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
        const hasPagination = page !== undefined && limit !== undefined;
        let data;
        let total;
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
        }
        else {
            data = await this.videoModel
                .find(filter)
                .sort({ isPremium: 1, position: 1, createdAt: -1 })
                .exec();
            total = data.length;
        }
        const videoList = data.map((video) => ({
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
        }));
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
    async findOne(id) {
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
    async create(createVideoDto) {
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
    async update(id, updateVideoDto) {
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
    async remove(id) {
        const result = await this.videoModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    async incrementViews(id) {
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
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideoService);
//# sourceMappingURL=video.service.js.map