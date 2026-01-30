import { supabase } from "@/lib/supabase";

export async function uploadToSupabase(
  file: File,
  bucket: "portofolio" | "jawaban-gambar"
): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}
