import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Music, MusicDocument } from "./schemas/music.schema";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { MusicItem } from "./interfaces/pagination.interface";

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name)
    private readonly musicModel: Model<MusicDocument>,
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const music = new this.musicModel(createMusicDto);
    return music.save();
  }

  async findAll(
    id?: string,
    categories?: string,
    isPremium?: boolean,
    active?: boolean,
    page?: number,
    limit?: number,
  ): Promise<{
    musicList: MusicItem[];
    isPremium: boolean;
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    const query: Record<string, any> = {};

    if (id) {
      query._id = id;
    }

    if (categories) {
      query.categories = { $in: [new Types.ObjectId(categories)] };
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

    const musicList: MusicItem[] = data.map((music) => ({
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

    // Solo devolvemos el objeto simple con los datos de paginación
    return {
      musicList,
      isPremium: hasAnyPremium,
      totalCount: total,
      currentPage: currentPage,
      totalPages,
    };
  }

  async findOne(id: string): Promise<Music> {
    const music = await this.musicModel.findById(id).exec();
    if (!music) {
      throw new NotFoundException(`Music with ID "${id}" not found`);
    }
    console.log("Music found:", music);
    return music;
  }

  async update(id: string, updateMusicDto: UpdateMusicDto): Promise<Music> {
    const music = await this.musicModel
      .findByIdAndUpdate(id, updateMusicDto, { new: true })
      .exec();

    if (!music) {
      throw new NotFoundException(`Music with ID "${id}" not found`);
    }

    return music;
  }

  async remove(id: string): Promise<void> {
    const result = await this.musicModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Music with ID "${id}" not found`);
    }
  }

  async incrementPlays(id: string): Promise<Music> {
    const music = await this.musicModel
      .findByIdAndUpdate(id, { $inc: { plays: 1 } }, { new: true })
      .exec();

    if (!music) {
      throw new NotFoundException(`Music with ID "${id}" not found`);
    }

    return music;
  }

  async findCategories(): Promise<string[]> {
    const categories = await this.musicModel.distinct("categories").exec();
    console.log("Categories found:", categories);
    return categories.map((idCategory) => idCategory.toString());
  }
}
