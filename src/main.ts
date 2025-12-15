import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

const logger = new Logger("Bootstrap");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global
  app.setGlobalPrefix("api");

  // Pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilitar CORS
  app.enableCors();

  // Iniciar servidor en el puerto 4000
  const port = 4000;
  await app.listen(port);

  // Mostrar mensaje de inicio
  logger.log(`🚀 Aplicación iniciada en http://localhost:${port}/api/`);
  logger.log(`📊 Modo: ${process.env.NODE_ENV || "development"}`);
}

bootstrap().catch((err: unknown) => {
  logger.error("Error al iniciar la aplicación", err);
  process.exit(1);
});
