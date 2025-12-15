import { GuidedMeditationService } from "./guide-meditation.service";
import { CreateGuidedMeditationDto } from "./dto/create-guided-meditation.dto";
import { UpdateGuidedMeditationDto } from "./dto/update-guided-meditation.dto";
import { GuidedMeditation } from "./schemas/guided-meditation.schema";
export declare class GuidedMeditationController {
    private readonly meditationService;
    constructor(meditationService: GuidedMeditationService);
    create(createMeditationDto: CreateGuidedMeditationDto): Promise<GuidedMeditation>;
    findAll(category?: string, isPremium?: boolean, active?: boolean): Promise<GuidedMeditation[]>;
    findOne(id: string): Promise<GuidedMeditation>;
    update(id: string, updateMeditationDto: UpdateGuidedMeditationDto): Promise<GuidedMeditation>;
    remove(id: string): Promise<void>;
    incrementPlays(id: string): Promise<GuidedMeditation>;
}
