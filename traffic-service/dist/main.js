"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3003);
    console.log('ZE TRAFFIC SERVICE IS RUNNING ON PORT 3003 SVP....');
}
bootstrap();
//# sourceMappingURL=main.js.map