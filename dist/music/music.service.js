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
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const music_schema_1 = require("./schemas/music.schema");
let MusicService = class MusicService {
    musicModel;
    constructor(musicModel) {
        this.musicModel = musicModel;
    }
    async create(createMusicDto) {
        const music = new this.musicModel(createMusicDto);
        return music.save();
    }
    async findAll(id, categories, isPremium, active, page, limit) {
        const query = {};
        if (id) {
            query._id = id;
        }
        if (categories) {
            query.categories = { $in: [new mongoose_2.Types.ObjectId(categories)] };
        }
        if (isPremium !== undefined) {
            query.isPremium = isPremium;
        }
        if (active !== undefined) {
            query.active = active;
        }
        const currentPage = page && page > 0 ? page : 1;
        const currentPageSize = limit && limit > 0 ? limit : 10;
        const skip = (currentPage - 1) * currentPageSize;
        const [data, total] = await Promise.all([
            this.musicModel
                .find(query)
                .sort({ order: 1, createdAt: -1 })
                .skip(skip)
                .limit(currentPageSize)
                .exec(),
            this.musicModel.countDocuments(query).exec(),
        ]);
        const musicList = data.map((music) => ({
            _id: music._id.toString(),
            name: music.title,
            description: music.description,
            position: music.order || 0,
            favorites: [],
            audioFilename: music.audioFilename,
            imageFilename: music.imageFilename,
            categories: music.categories.map((cat) => cat.toString()),
            isPremium: music.isPremium,
            typeContent: "app",
            slug: music.title ? music.title.toLowerCase().replace(/\s+/g, "-") : "",
            createdAt: music.createdAt ? new Date(music.createdAt).toISOString() : "",
            updatedAt: music.updatedAt ? new Date(music.updatedAt).toISOString() : "",
            __v: 0,
            plays: music.plays,
            order: music.order,
            active: music.active,
        }));
        const totalPages = Math.ceil(total / currentPageSize);
        const hasAnyPremium = musicList.some((item) => item.isPremium);
        return {
            musicList,
            isPremium: hasAnyPremium,
            totalCount: total,
            currentPage: currentPage,
            totalPages,
        };
    }
    async findOne(id) {
        const music = await this.musicModel.findById(id).exec();
        if (!music) {
            throw new common_1.NotFoundException(`Music with ID "${id}" not found`);
        }
        console.log("Music found:", music);
        return music;
    }
    async update(id, updateMusicDto) {
        const music = await this.musicModel
            .findByIdAndUpdate(id, updateMusicDto, { new: true })
            .exec();
        if (!music) {
            throw new common_1.NotFoundException(`Music with ID "${id}" not found`);
        }
        return music;
    }
    async remove(id) {
        const result = await this.musicModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Music with ID "${id}" not found`);
        }
    }
    async incrementPlays(id) {
        const music = await this.musicModel
            .findByIdAndUpdate(id, { $inc: { plays: 1 } }, { new: true })
            .exec();
        if (!music) {
            throw new common_1.NotFoundException(`Music with ID "${id}" not found`);
        }
        return music;
    }
    async findCategories() {
        const categories = await this.musicModel.distinct("categories").exec();
        console.log("Categories found:", categories);
        return categories.map((idCategory) => idCategory.toString());
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(music_schema_1.Music.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MusicService);
//# sourceMappingURL=music.service.js.map