import { StatusCodes } from "http-status-codes";
import path, { dirname } from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";

// Get the __filename and __dirname equivalents
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);

class editorUploadService {
  async imageUpload(req, res) {
    if (req.file) {
      const filePath = `/api/v1/dashboard/uploads/${req.file.filename}`;

      res.status(StatusCodes.OK).json({ link: filePath });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `No image was uplaoded` });
    }
  }
  async imageDeleteUploaded(req, res) {
    let imageUrl = "";
    let { src } = req.body;
    if (src) {
      imageUrl = src;
    } else {
      imageUrl = req.body.src;
    }
    // // Remove the prefix using replace
    const baseName = imageUrl.replace(/^\/api\/v1\/dashboard\/uploads\//, "");

    // const regex = /^\/api\/v1\/dashboard\/uploads\/(.+)$/;
    // const match = imageUrl.match(regex);
    // let baseName="";
    // if (match) {
    //     baseName = match[1];
    // }

    const filePath = path.join(__dirname, "/../uploads/", baseName);

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to delete image",
        });
      }

      res.json({
        message: "Image deleted successfully",
      });
    });
  }

  async getUploadsDirectoryToListFiles(req, res) {
    const directoryPath = path.join(__dirname, "/../uploads");
    console.log(directoryPath);
    // Read the files from the uploads directory
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({
          message: "Unable to scan files in directory",
        });
      }

      // Map the files to URLs that Froala can use
      const fileUrls = files.map((file) => {
        return {
          url: `/api/v1/dashboard/uploads/${file}`,
          thumb: `/api/v1/dashboard/uploads/${file}`, // Optional: Same as URL if thumbnails are not separate
        };
      });

      // Send the array of file URLs as the response
      res.json(fileUrls);
    });
  }
}

export default new editorUploadService();
