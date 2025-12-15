import { Model } from "mongoose";
import { CreateGuidedMeditationDto } from "./dto/create-guided-meditation.dto";
import { UpdateGuidedMeditationDto } from "./dto/update-guided-meditation.dto";
import { GuidedMeditation, GuidedMeditationDocument } from "./schemas/guided-meditation.schema";
export declare class GuidedMeditationService {
    private readonly meditationModel;
    private readonly logger;
    constructor(meditationModel: Model<GuidedMeditationDocument>);
    create(createMeditationDto: CreateGuidedMeditationDto): Promise<GuidedMeditation>;
    findAll(category?: string, isPremium?: boolean, active?: boolean): Promise<GuidedMeditation[]>;
    findOne(id: string): Promise<GuidedMeditation>;
    update(id: string, updateMeditationDto: UpdateGuidedMeditationDto): Promise<GuidedMeditation>;
    remove(id: string): Promise<void>;
    incrementPlays(id: string): Promise<GuidedMeditation>;
}
