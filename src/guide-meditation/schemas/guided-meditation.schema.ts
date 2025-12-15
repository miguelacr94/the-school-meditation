import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type GuidedMeditationDocument = GuidedMeditation & Document;

@Schema({ timestamps: true })
export class GuidedMeditation {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  audioUrl: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: 0 })
  plays: number;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: "User" })
  createdBy?: Types.ObjectId;
}

export const GuidedMeditationSchema =
  SchemaFactory.createForClass(GuidedMeditation);
