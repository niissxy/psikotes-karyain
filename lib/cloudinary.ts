import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file (image or raw file like PDF/DOC) to Cloudinary
 */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // tentukan resource_type berdasarkan tipe file
  const extension = file.name.split(".").pop()?.toLowerCase();
  const resource_type = extension === "pdf" || extension === "doc" || extension === "docx"
    ? "raw"
    : "image";

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error || !result) return reject(error ?? "Upload gagal");
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}
