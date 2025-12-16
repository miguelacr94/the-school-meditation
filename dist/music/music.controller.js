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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const music_service_1 = require("./music.service");
const create_music_dto_1 = require("./dto/create-music.dto");
const update_music_dto_1 = require("./dto/update-music.dto");
const find_music_dto_1 = require("./dto/find-music.dto");
let MusicController = class MusicController {
    musicService;
    constructor(musicService) {
        this.musicService = musicService;
    }
    create(dto) {
        return this.musicService.create(dto);
    }
    findAll(query) {
        return this.musicService.findAll(query.id, query.categories, query.isPremium ? query.isPremium === "true" : undefined, query.active ? query.active === "true" : undefined, query.page, query.limit);
    }
    findOne(id) {
        return this.musicService.findOne(id);
    }
    update(id, dto) {
        return this.musicService.update(id, dto);
    }
    remove(id) {
        return this.musicService.remove(id);
    }
    incrementPlays(id) {
        return this.musicService.incrementPlays(id);
    }
};
exports.MusicController = MusicController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_dto_1.CreateMusicDto]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_music_dto_1.FindMusicQueryDto]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_music_dto_1.UpdateMusicDto]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/play"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "incrementPlays", null);
exports.MusicController = MusicController = __decorate([
    (0, common_1.Controller)("musics"),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
//# sourceMappingURL=music.controller.js.map