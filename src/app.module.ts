import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    }), ConfigModule.forRoot({
        isGlobal: true,
    }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
