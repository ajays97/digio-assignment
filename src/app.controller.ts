import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('client/document/download')
  downloadDocument(@Query('documentId') id: string) {
    return this.appService.downloadDocument(id);
  }

  @Get('client/document/:id')
  getDocument(@Param('id') id: string) {
    return this.appService.getDocument(id);
  }


  @Post('/client/document/upload')
  uploadDocument(
    @Body() uploadRequestDto: any
  ) {
    return this.appService.uploadDocument(uploadRequestDto);
  }

}
