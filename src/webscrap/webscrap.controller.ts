import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { WebscrapService } from './webscrap.service';

@Controller('webscrap')
export class WebscrapController {
  constructor(private readonly webscrapService: WebscrapService) {}

  @Get('techs')
  async getTechs(@Res() response: Response) {
    await this.webscrapService.getTechs();
    return response.status(200).send({ message: 'ok' });
  }

  @Get('links')
  async getLinks(@Res() response: Response) {
    await this.webscrapService.getLinks();
    return response.status(200).send({ message: 'ok' });
  }
}
