"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const logger = new common_1.Logger("Bootstrap");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors();
    const port = 4000;
    await app.listen(port);
    logger.log(`🚀 Aplicación iniciada en http://localhost:${port}/api/`);
    logger.log(`📊 Modo: ${process.env.NODE_ENV || "development"}`);
}
bootstrap().catch((err) => {
    logger.error("Error al iniciar la aplicación", err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map