import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DigioService implements OnModuleInit {
  private readonly _logger = new Logger(DigioService.name);

  constructor() {}

  async onModuleInit(): Promise<void> {
    this._logger.log(`Initializing ${DigioService.name}`);
  }
}
