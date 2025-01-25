import { Request, Response } from "express";
import cloudinary from "../cloudinary";

export const cloudUpload = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    res.status(400).send("No file uploaded.");
    //throw new Error("No file uploaded.");
    return;
  }
  cloudinary.uploader.upload(file.path, (err, result) => {
    if (err) {
      console.error("error uploading to cloudinary: ", err);
      res.status(500).json({
        message: "error uploading to cloudinary",
        error: err,
      });
    }

    console.log("file uploaded to cloudinary: ", result);

    res.status(200).json({
      message: "file uploaded to cloudinary",
      result,
    });
  });
};
