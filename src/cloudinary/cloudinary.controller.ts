import { Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Context } from '@nestjs/graphql';
import { Response } from 'express';

@Controller('cloudinary')
export class CloudinaryController {

    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Context() context: { req: Request },
        @Res() response: Response
    ) {
        console.log(file);
      const upload = await this.cloudinaryService.upload(file);
      response.status(200).send({url: upload.url});
    }
}
