import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VideoDocument = Video & Document;

@Schema({ collection: "videocontents" })
export class Video {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true, enum: ["youtube", "vimeo", "direct"] })
  type: string;

  @Prop({ default: 0 })
  position: number;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  views: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

// Update the updatedAt field on save
VideoSchema.pre("save", function (next: () => void) {
  this.updatedAt = new Date();
  next();
});
