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
var GuidedMeditationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidedMeditationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const guided_meditation_schema_1 = require("./schemas/guided-meditation.schema");
let GuidedMeditationService = GuidedMeditationService_1 = class GuidedMeditationService {
    meditationModel;
    logger = new common_1.Logger(GuidedMeditationService_1.name);
    constructor(meditationModel) {
        this.meditationModel = meditationModel;
    }
    async create(createMeditationDto) {
        const createdMeditation = new this.meditationModel(createMeditationDto);
        return createdMeditation.save();
    }
    async findAll(category, isPremium, active) {
        const query = {};
        if (category) {
            query.category = category;
        }
        if (isPremium !== undefined) {
            query.isPremium = isPremium === true;
        }
        if (active !== undefined) {
            query.active = active === true;
        }
        this.logger.log(`Ejecutando consulta con query: ${JSON.stringify(query)}`);
        this.logger.log(`Conectando a la colección: guides`);
        try {
            const result = await this.meditationModel
                .find(query)
                .sort({ order: 1, createdAt: -1 })
                .exec();
            this.logger.log(`Se encontraron ${result.length} documentos`);
            if (result.length === 0) {
                this.logger.log("Intentando consulta sin filtros...");
                const allDocs = await this.meditationModel.find().exec();
                this.logger.log(`Total de documentos en la colección: ${allDocs.length}`);
                if (allDocs.length > 0) {
                    this.logger.log(`Primer documento: ${JSON.stringify(allDocs[0])}`);
                }
            }
            return result;
        }
        catch (error) {
            this.logger.error("Error al ejecutar consulta:", error);
            throw error;
        }
    }
    async findOne(id) {
        const meditation = await this.meditationModel.findById(id).exec();
        if (!meditation) {
            throw new common_1.NotFoundException(`Guided meditation with ID "${id}" not found`);
        }
        return meditation;
    }
    async update(id, updateMeditationDto) {
        const existingMeditation = await this.meditationModel
            .findByIdAndUpdate(id, updateMeditationDto, { new: true })
            .exec();
        if (!existingMeditation) {
            throw new common_1.NotFoundException(`Guided meditation with ID "${id}" not found`);
        }
        return existingMeditation;
    }
    async remove(id) {
        const result = await this.meditationModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Guided meditation with ID "${id}" not found`);
        }
    }
    async incrementPlays(id) {
        const meditation = await this.meditationModel
            .findByIdAndUpdate(id, { $inc: { plays: 1 } }, { new: true })
            .exec();
        if (!meditation) {
            throw new common_1.NotFoundException(`Guided meditation with ID "${id}" not found`);
        }
        return meditation;
    }
};
exports.GuidedMeditationService = GuidedMeditationService;
exports.GuidedMeditationService = GuidedMeditationService = GuidedMeditationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(guided_meditation_schema_1.GuidedMeditation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GuidedMeditationService);
//# sourceMappingURL=guide-meditation.service.js.map