import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateGuidedMeditationDto } from "./dto/create-guided-meditation.dto";
import { UpdateGuidedMeditationDto } from "./dto/update-guided-meditation.dto";
import {
  GuidedMeditation,
  GuidedMeditationDocument,
} from "./schemas/guided-meditation.schema";

@Injectable()
export class GuidedMeditationService {
  private readonly logger = new Logger(GuidedMeditationService.name);

  constructor(
    @InjectModel(GuidedMeditation.name)
    private readonly meditationModel: Model<GuidedMeditationDocument>,
  ) {}

  async create(
    createMeditationDto: CreateGuidedMeditationDto,
  ): Promise<GuidedMeditation> {
    const createdMeditation = new this.meditationModel(createMeditationDto);
    return createdMeditation.save();
  }

  async findAll(
    category?: string,
    isPremium?: boolean,
    active?: boolean,
  ): Promise<GuidedMeditation[]> {
    // Construir query dinámicamente
    const query: Record<string, unknown> = {};

    // Filtrar por categoría si se proporciona
    if (category) {
      query.category = category;
    }

    // Filtrar por contenido premium si se proporciona
    if (isPremium !== undefined) {
      query.isPremium = isPremium === true;
    }

    // Filtrar por estado activo si se proporciona
    if (active !== undefined) {
      query.active = active === true;
    }

    this.logger.log(`Ejecutando consulta con query: ${JSON.stringify(query)}`);
    this.logger.log(`Conectando a la colección: guides`);

    try {
      // Ejecutar consulta a la base de datos MongoDB
      // Ordena primero por order (ascendente) y luego por createdAt (descendente)
      const result = await this.meditationModel
        .find(query)
        .sort({ order: 1, createdAt: -1 })
        .exec();

      this.logger.log(`Se encontraron ${result.length} documentos`);

      // Si no hay resultados, intentamos una consulta sin filtros para debug
      if (result.length === 0) {
        this.logger.log("Intentando consulta sin filtros...");
        const allDocs = await this.meditationModel.find().exec();
        this.logger.log(
          `Total de documentos en la colección: ${allDocs.length}`,
        );

        if (allDocs.length > 0) {
          this.logger.log(`Primer documento: ${JSON.stringify(allDocs[0])}`);
        }
      }

      return result;
    } catch (error) {
      this.logger.error("Error al ejecutar consulta:", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<GuidedMeditation> {
    const meditation = await this.meditationModel.findById(id).exec();
    if (!meditation) {
      throw new NotFoundException(
        `Guided meditation with ID "${id}" not found`,
      );
    }
    return meditation;
  }

  async update(
    id: string,
    updateMeditationDto: UpdateGuidedMeditationDto,
  ): Promise<GuidedMeditation> {
    const existingMeditation = await this.meditationModel
      .findByIdAndUpdate(id, updateMeditationDto, { new: true })
      .exec();
    if (!existingMeditation) {
      throw new NotFoundException(
        `Guided meditation with ID "${id}" not found`,
      );
    }

    return existingMeditation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.meditationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Guided meditation with ID "${id}" not found`,
      );
    }
  }

  async incrementPlays(id: string): Promise<GuidedMeditation> {
    const meditation = await this.meditationModel
      .findByIdAndUpdate(id, { $inc: { plays: 1 } }, { new: true })
      .exec();

    if (!meditation) {
      throw new NotFoundException(
        `Guided meditation with ID "${id}" not found`,
      );
    }

    return meditation;
  }
}
