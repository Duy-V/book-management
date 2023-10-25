"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: '*' });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory(errors) {
            const convertedErrors = errors.map((error) => {
                const constraints = Object.keys(error.constraints).map((key) => error.constraints[key]);
                return {
                    field: error.property,
                    errors: constraints,
                };
            });
            return new common_1.BadRequestException(convertedErrors);
        },
    }));
    await app.listen(4200);
}
bootstrap();
//# sourceMappingURL=main.js.map