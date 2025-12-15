import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Music, MusicDocument } from "./schemas/music.schema";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";

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
  ): Promise<Music[]> {
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

    return this.musicModel.find(query).sort({ order: 1, createdAt: -1 }).exec();
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
