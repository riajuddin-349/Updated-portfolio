import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { addGalleryItems, getGallery } from "@/lib/content";
import { isAdmin } from "@/lib/auth";
import { uploadCloudinaryFile } from "@/lib/cloudinary-store";

export const runtime = "nodejs";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const MAX_FILE_SIZE = 15 * 1024 * 1024;

export async function GET() {
  try { return NextResponse.json({ items: await getGallery() }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load gallery." }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const title = String(form.get("title") || "Gallery").trim() || "Gallery";
  const files = form.getAll("images").filter((value): value is File => value instanceof File);
  if (!files.length) return NextResponse.json({ error: "Select at least one image." }, { status: 400 });

  const items = [];
  try {
    for (const file of files) {
      if (!allowed.has(file.type)) throw new Error(`Unsupported image type: ${file.type}`);
      if (file.size > MAX_FILE_SIZE) throw new Error(`${file.name} is larger than 15MB.`);
      const image = await uploadCloudinaryFile(file, "portfolio/gallery", "image");
      items.push({ id: randomUUID(), title, image, createdAt: new Date().toISOString() });
    }
    return NextResponse.json({ items: await addGalleryItems(items) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Gallery upload failed." }, { status: 400 });
  }
}
