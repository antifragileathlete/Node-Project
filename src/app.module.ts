import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

@Module({
    imports: [HealthModule, LoggerModule.forRoot({
        pinoHttp: {
            level: process.env.LOG_LEVEL || 'info',
            transport:
                process.env.NODE_ENV !== 'production'
                    ? {
                        target: 'pino-pretty',
                        options: {
                            singleLine: true,
                        },
                    }
                    : undefined,
        },
    }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
