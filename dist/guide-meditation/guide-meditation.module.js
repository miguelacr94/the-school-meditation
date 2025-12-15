"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidedMeditationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const guide_meditation_controller_1 = require("./guide-meditation.controller");
const guide_meditation_service_1 = require("./guide-meditation.service");
const guided_meditation_schema_1 = require("./schemas/guided-meditation.schema");
let GuidedMeditationModule = class GuidedMeditationModule {
};
exports.GuidedMeditationModule = GuidedMeditationModule;
exports.GuidedMeditationModule = GuidedMeditationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: guided_meditation_schema_1.GuidedMeditation.name,
                    schema: guided_meditation_schema_1.GuidedMeditationSchema,
                    collection: "guides",
                },
            ]),
        ],
        controllers: [guide_meditation_controller_1.GuidedMeditationController],
        providers: [guide_meditation_service_1.GuidedMeditationService],
        exports: [guide_meditation_service_1.GuidedMeditationService],
    })
], GuidedMeditationModule);
//# sourceMappingURL=guide-meditation.module.js.map