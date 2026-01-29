import { v2 as cloudinary } from "cloudinary";

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload PDF/DOC/DOCX ke Cloudinary
 * file: File input HTML
 * folder: nama folder di Cloudinary
 * Return: URL yang bisa langsung diakses di browser
 */
export async function uploadFileServer(file: File, folder: string = "portofolio"): Promise<string> {
  if (!(file instanceof File)) throw new Error("File harus dari input HTML");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Ambil ekstensi asli
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !["pdf", "doc", "docx"].includes(ext)) throw new Error("File harus PDF, DOC, atau DOCX");

  const fileName = file.name.replace(/\.[^/.]+$/, ""); // nama tanpa ekstensi

  // Upload ke Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    {
      resource_type: "raw",      // penting untuk PDF/DOC
      folder,
      public_id: fileName,       // nama file tanpa ekstensi
      use_filename: true,        // pakai nama file asli
      unique_filename: false,    // jangan ditambahkan random
      overwrite: true,
      format: ext,               // <--- ini yang bikin Cloudinary simpan dengan tipe yang benar
    }
  );

  if (!result.secure_url) throw new Error("Upload gagal");

  // Kembalikan URL dari Cloudinary (bisa dibuka langsung)
  return result.secure_url;
}
