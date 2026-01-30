import { v2 as cloudinary } from "cloudinary";

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file PDF/DOC/DOCX/Gambar ke Cloudinary
 */
export async function uploadFileServer(file: File, folder: string = "portofolio"): Promise<string> {
  if (!(file instanceof File)) throw new Error("File harus dari input HTML");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !["pdf", "doc", "docx", "jpg", "jpeg", "png"].includes(ext)) {
    throw new Error("File harus PDF, DOC, DOCX atau gambar");
  }

  const fileName = file.name.replace(/\.[^/.]+$/, "");

  // Upload sebagai raw (dokumen) atau image
  const resourceType = ["jpg", "jpeg", "png"].includes(ext) ? "image" : "raw";

  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    {
      resource_type: resourceType,
      folder,
      public_id: fileName,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    }
  );

  if (!result.secure_url) throw new Error("Upload gagal");
  return result.secure_url;
}
