import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MusicDocument = Music & Document;

@Schema({ timestamps: true })
export class Music {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 1 })
  duration: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: "Category" }],
    default: [],
    index: true,
  })
  categories: Types.ObjectId[];

  @Prop({ required: true })
  audioUrl: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: 0 })
  plays: number;

  @Prop({ default: false, index: true })
  isPremium: boolean;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true, index: true })
  active: boolean;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
