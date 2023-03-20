import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { SampleModule } from './app/digio/digio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import _config, { ConfigVariablesType } from './config';
import { CommonModule } from './common/common.module';
import { DIGIO_HTTP_CLIENT } from './app/constants';
import axios from 'axios';

@Module({
  imports: [
    CommonModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [_config]
    }),
    HealthModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DIGIO_HTTP_CLIENT,
      useFactory: (
        configService: ConfigService<ConfigVariablesType>,
      ) => {
        const { baseUrl, clientId, clientSecret } = configService.get(
          'digio',
          {
            infer: true,
          },
        );

        const axiosInstance = axios.create({
          baseURL: baseUrl,
          headers: {
            'authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
          }
        });

        return axiosInstance;
      },
      inject: [ConfigService],
    }
  ]
})
export class AppModule {}
