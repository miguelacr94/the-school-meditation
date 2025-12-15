import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { envSchema } from "./config/env.schema";
import { GuidedMeditationModule } from "./guide-meditation/guide-meditation.module";
import { MusicModule } from "./music/music.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || "", {
      dbName: process.env.MONGODB_DATABASE || "test",
    }),
    GuidedMeditationModule,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
