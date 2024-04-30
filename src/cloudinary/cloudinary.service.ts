import { Injectable } from "@nestjs/common";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  async upload(data: Express.Multer.File): Promise<CloudinaryResponse> {
    try {
      const b64 = Buffer.from(data.buffer).toString("base64");
      let dataURI = "data:" + data.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "Portfolio",
      });

      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
