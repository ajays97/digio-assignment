import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SampleResolver } from './graphql/sample.resolver';
import { DigioService } from './digio.service';

@Module({
  imports: [ConfigModule],
  providers: [DigioService, SampleResolver]
})
export class SampleModule {}
