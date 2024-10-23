import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get(['/health', '/api/health'])
    async healthCheck() {
        return { works: 'yeah' };
    }
}
